const {Router} = require('express');
const router = Router();
const {upload} = require('../app/middlewares/mutler')


const {postDestination , getDestination, getSingleDestination} = require('../app/controllers/api/DestinationController')


router.post('/', upload.single("DestinationImage"), postDestination);

router.get('/', getDestination );

router.get('/:id', getSingleDestination);


module.exports = router;