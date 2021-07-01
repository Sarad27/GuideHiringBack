const {Router} = require('express');
const router = Router();

const {signUp, login, getAuthenticatedUser, updateGuideProfile, updateTouristProfile, logout} = require('../app/controllers/api/AuthController');

const {registerValidation, loginValidation} = require('../app/middlewares/validation');

const {auth} = require('../app/middlewares/auth');

router.post('/signUp', registerValidation, signUp);

router.post('/signUp/guideProfile', auth, updateGuideProfile);

router.post('/signUp/touristProfile', auth, updateTouristProfile);

router.post('/login', loginValidation, login);

router.get('/logout', auth, logout);

router.get("/", auth,  getAuthenticatedUser);


module.exports = router;