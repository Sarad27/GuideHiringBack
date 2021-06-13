const {Router} = require('express');
const router = Router();
const {upload} = require('../app/middlewares/mutler')

const {getUser, getGuide} = require('../app/controllers/api/User')
const {auth} = require('../app/middlewares/auth');

router.get('/guides', getGuide);

router.get('/:id', auth,  getUser);



module.exports = router;