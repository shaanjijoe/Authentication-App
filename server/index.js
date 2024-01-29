const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const connect = require('./database/connection')
const router = require('./router/route');

// Middleware
app.use(express.json());
app.use(cors());          //For cross url api requests
app.use(morgan('tiny'));  //LOgs http requests
app.disable('x-powered-by');// Prevent leak of tech stack info




// Api endpoints
app.use('/api', router);

app.get('/', (req,res) => {
    res.status(201).json("Home get request");
});







const port = process.env.PORT || 8000;
connect().then(() => {
    try{
        // server starting configs
        app.listen(port, () => {
            console.log('Server started in http://localhost:', port);
        })

    } catch (error) {
        console.log("Cannot connect to server");
    }
}).catch( error => {
    console.log("Database connection not working");
})



