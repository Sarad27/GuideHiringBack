const {Router} = require('express');
const router = Router();
const {upload} = require('../app/middlewares/mutler')

const {getUser, getGuide, updateUser} = require('../app/controllers/api/User')
const {auth} = require('../app/middlewares/auth');

router.get('/guides', getGuide);

router.get('/:id', auth,  getUser);

router.put('/updateUser', auth, updateUser)

module.exports = router;