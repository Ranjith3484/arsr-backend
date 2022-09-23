const express = require('express');


const morgan = require('morgan');
const cors = require('cors');

const app = express();
const mongoose = require('mongoose');
const employeeRouter = require('./src/routers/employee.router');

mongoose.connect('mongodb+srv://ranjith:ranjith@cluster0.yglxxqi.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
},()=>{
    console.log('DB Connected')
})

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(employeeRouter)
app.get('/', (req,res) => {
    res.status(201).send('Welcome')
})




const port = process.env.PORT || 4001;
const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
})