/* app.css - Nhat Phuc Nguyen - 301157980 - September/28/2022 */
let express = require('express');
let router = express.Router();

// Create controllers
let indexController = require('../controllers/index')

/* GET home page. */
router.get('/', indexController.displayHomePage);

/* GET about page. */
router.get('/about', indexController.displayAboutPage);

/* GET projects page. */
router.get('/projects', indexController.displayProjectsPage);

/* GET services page. */
router.get('/services', indexController.displayServicesPage);

/* GET contact page. */
router.get('/contact', indexController.displayContactPage);

/* POST contact page + redirect to home page */
router.post('/contact', indexController.processContactPage);

/* GET route for displaying login page. */
router.get('/login',indexController.displayLoginPage);

/* POST route for processing login page. */
router.post('/login',indexController.processLoginPage);

/* GET route for displaying register page. */
router.get('/register',indexController.displayRegisterPage);

/* POST route for processing register page. */
// router.post('/register',indexController.processRegisterPage);

module.exports = router;
