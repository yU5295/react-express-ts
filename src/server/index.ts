
import express, {Request, Response, Router, Express} from 'express';
import bodyParser from 'body-parser';
import router from './route';
import DBConnect from "./dbConfigs";

// call express
const app: Express = express(); // define our app using express

// configure app to use bodyParser for
// Getting data from body of requests
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

const port: number = Number(process.env.PORT) || 8050; // set our port

// connect to database. right now it's just working with mongodb
// but in near future it will be configured for other databases as well
DBConnect.dbConnection();

// Send index.html on root request
app.use(express.static('dist'));
app.get('/', (req:Request, res:Response) => {
    console.log('sending index.html');
    res.sendFile('/dist/index.html');
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
const routes: Router[] = Object.values(router);
app.use('/api', routes);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log(`App listening on ${port}`);
