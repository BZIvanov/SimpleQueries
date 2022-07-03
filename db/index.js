require('dotenv').config();
const { Pool } = require('pg');
const pgp = require('pg-promise');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('Connected');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = {
  query: (text, params, callback) => {
    const start = Date.now();

    return pool.query(text, params, (err, result) => {
      const duration = Date.now() - start;

      // with pg-promise we can see the actual query with the params applied
      const nativeQuery = pgp.as.format(text, params);

      if (result) {
        console.log('Executed query', {
          text: nativeQuery,
          duration,
          rows: result.rowCount,
        });

        result.nativeQuery = nativeQuery;
      }

      callback(err, result);
    });
  },
  getClient: (callback) => {
    pool.connect((err, client, done) => {
      const query = client.query;
      // monkey patch the query method to keep track of the last query executed
      client.query = (...args) => {
        client.lastQuery = args;
        return query.apply(client, args);
      };
      // set a timeout of 5 seconds, after which we will log this client's last query
      const timeout = setTimeout(() => {
        console.error('A client has been checked out for more than 5 seconds!');
        console.error(
          `The last executed query on this client was: ${client.lastQuery}`
        );
      }, 5000);
      const release = (err) => {
        // call the actual 'done' method, returning this client to the pool
        done(err);
        // clear our timeout
        clearTimeout(timeout);
        // set the query method back to its old un-monkey-patched version
        client.query = query;
      };
      callback(err, client, release);
    });
  },
};
