const express = require('express');
const morgan = require('morgan');
const taskRoutes = require('./route/task.route.js');
const cors = require('cors');
const app = express();


app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(taskRoutes);
app.use((err,req,res,next)=>{
    return res.json({
        message: "ERRORASO!!!!!",
    })
})

app.listen(4000);
console.log('server on port 4000');