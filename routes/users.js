const router = require('express').Router();
const {
  getUsers,
  createUser,
  getUser,
  updateUser,
  removeUser,
  getUsersCities,
} = require('../controllers/users');

router.route('/').get(getUsers).post(createUser);
router.route('/cities').get(getUsersCities);
router.route('/:id').get(getUser).patch(updateUser).delete(removeUser);

module.exports = router;
