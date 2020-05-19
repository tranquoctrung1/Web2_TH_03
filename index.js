const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const exphbs  = require('express-handlebars');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const Adminverify = require('./middlewares/adminverify.middleware'); 

const app =  express();


// import router
const Home = require('./router/home.route');
const Register = require('./router/register.route');
const Login = require('./router/login.route');
const Admin = require('./router/admin.route');
const SignUp = require('./router/signup.route');

const PORT = 3000;

//use body-parser
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//use cookieParser
app.use(cookieParser());

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: true }
}))

//use express handlebars template engine
app.engine("hbs", exphbs(
    {
        layoutsDir: "views/_layouts",
        defaultLayout: "main",
        partialsDir: "views/_partials",
        extname: ".hbs"
    }
));
app.set('view engine', "hbs");


//use bootstrap 
app.use('/bootstrap', express.static(`${__dirname}/node_modules/bootstrap/dist`))
app.use('/jquery', express.static(`${__dirname}/node_modules/jquery/dist`))
app.use('/popper', express.static(`${__dirname}/node_modules/popper.js/dist/umd`))

// use static file
app.use('/', express.static(path.join(__dirname, 'public')));

// use router 
app.use('/', Home);
app.use('/reg', Register);
app.use('/login', Login);
app.use('/signup', SignUp);

//use Admin router
app.use('/admin',Adminverify.adminverify ,Admin);

// default middleware
app.use((function(req, res)
{
    res.render('404',{layout: false})
}))

//default error middleware
app.use((function(err, req, res, next)
{
    console.error(err.stack)
    res.status(500).render('500', {layout: false});
}))

app.listen(PORT, () =>
{
    console.log("Server is running on port " + PORT);
})
