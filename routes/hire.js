const {Router} = require('express');
const router = Router();

const {auth} = require('../app/middlewares/auth');
const {Hire, getHires} = require('../app/controllers/api/HireController')

// router.post('/guides', getGuide);

router.post('/', auth, Hire);

router.get('/', auth, getHires)



module.exports = router;