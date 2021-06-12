const {Router} = require('express');
const router = Router();
const {upload} = require('../app/middlewares/mutler')

const {getUser} = require('../app/controllers/api/User')
const {auth} = require('../app/middlewares/auth');



router.get('/:id', auth,  getUser);


module.exports = router;