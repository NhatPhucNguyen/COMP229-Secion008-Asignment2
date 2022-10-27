let express = require('express');
let router = express.Router();
let passport = require('passport');

// Create controller
let businessContactsController = require('../controllers/business_contacts');

//helper function for guarding routes
function requireAuth(req,res,next){
    if(!req.isAuthenticated()){
        return res.redirect('/login');
    }
    next();
}

/* GET route for displaying the Business Contacts page*/
router.get('/',requireAuth,businessContactsController.displayContactList);

/* GET route for displaying the Edit Business Contacts page*/
router.get('/edit/:id',requireAuth, businessContactsController.displayContactEditPage);

/* POST route for processing the Edit Business Contacts page*/
router.post('/edit/:id',requireAuth, businessContactsController.processContactEditPage);

/* GET Delete route to perform deletion*/
router.get('/delete/:id',requireAuth, businessContactsController.performDelete);

module.exports = router;