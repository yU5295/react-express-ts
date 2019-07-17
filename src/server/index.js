
var express = require( 'express' );        // call express
var app = express();                 // define our app using express
var bodyParser = require( 'body-parser' );
const os = require('os');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );

var port = process.env.PORT || 8050;        // set our port

app.use(express.static('dist'));
app.get('/', function(req, res){
	console.log('sending index.html');
	res.sendFile('/dist/index.html');
});
// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use( function ( req, res, next ) {
  // do logging
  console.log( 'App is running' );
  next(); // make sure we go to the next routes and don't stop here
} );
// test http methods
// ----------------------------------------------------
router.route( '/test' )
  .get(function (req, res ) {
    res.json( { username: os.userInfo().username } )
  } )
  .post(bodyParser.json(), function ( req, res ) {
    res.json( req.body );

  } )
  .put(bodyParser.json(), function(req,res){
  	res.json(req.body);
  })
  .delete(bodyParser.json(), function(req, res){
  	res.json(req.body);
  });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use( '/api', router );

// START THE SERVER
// =============================================================================
app.listen( port );
console.log( `App listening on ${port}` );