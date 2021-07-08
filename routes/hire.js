const {Router} = require('express');
const router = Router();

const {auth} = require('../app/middlewares/auth');
const {Hire, getHires, confirmHire} = require('../app/controllers/api/HireController')

// router.post('/guides', getGuide);

router.post('/', auth, Hire);

router.get('/', auth, getHires)

router.post('/confirm/:id', auth,  confirmHire)



module.exports = router;