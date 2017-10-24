module.exports = function (app , passport) {
let voyage = require('./models/voyage')
let user = require('./models/user')
user.find((err, users)=>{
    users.forEach((obj)=>{{
        let meuh = obj.local.nom
        console.log(meuh)
    }})
})
    // normal routes ===============================================================
    app.get ('/dashbord', (req, res)=> {
        res.render('dashbord.ejs')

    })

    app.get('/dashbord/card', (req, res)=> {
        res.render('card.ejs')
})

app.get('/dashbord/dashItineraire', (req, res)=> {
    res.render('dashItineraire.ejs')
})

// process the card form
/*app.post('/dashbord/card')*/

    // show the home page (will also have our login links)
    app.get('/', function (req, res) {
        voyage.find((err, voyages)=>{
            res.render('index.ejs', { mesVoyages : voyages});
        });
    });
    app.get('/voyage/:id', ((req, res) => {
        voyage.find((err, voyages) => {
            res.render('voyage.ejs', {
                voyage: req.params.id, mesVoyages: voyages.filter((voyage) => {
                    return voyage.id == req.params.id
                })
                [0]
            })
        })
    }))
    
    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function (req, res) {
        res.render('profile.ejs', {
            user: req.user
        });
    });

    // LOGOUT ==============================
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
    app.get('/contact',(req,res)=>{
        res.render('contact.ejs')
    })
    app.get('/mentionslegales',(req,res)=>{
        res.render('mentions.ejs')
    })
    // =============================================================================
    // AUTHENTICATE (FIRST LOGIN) ==================================================
    // =============================================================================

    // locally --------------------------------
    // LOGIN ===============================
    // show the login form
    app.get('/login', function (req, res) {
        res.render('login.ejs', {
            message: req.flash('loginMessage')
        });
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    // SIGNUP =================================
    // show the signup form
    app.get('/signup', function (req, res) {
        res.render('signup.ejs', {
            message: req.flash('signupMessage')
        });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    // =============================================================================
    // AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
    // =============================================================================

    // locally --------------------------------
    app.get('/connect/local', function (req, res) {
        res.render('connect-local.ejs', {
            message: req.flash('loginMessage')
        });
    });
    
    app.post('/connect/local', passport.authenticate('local-signup', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/connect/local', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    // =============================================================================
    // UNLINK ACCOUNTS =============================================================
    // =============================================================================
    // used to unlink accounts. for social accounts, just remove the token
    // for local account, remove email and password
    // user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function (req, res) {
        var user = req.user;
        user.local.email = undefined;
        user.local.password = undefined;
        user.save(function (err) {
            res.redirect('/profile');
        });
    });
};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
