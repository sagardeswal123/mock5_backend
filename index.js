const express = require('express');
const cors = require('cors');
const { connection } = require('./db');
const { userRouter } = require('./routes/user.router');
const { employeeRouter } = require('./routes/employee.router');


const app = express();
app.use(express.json());
app.use(cors());

app.use("/users",userRouter);

app.use("/employees",employeeRouter);


app.listen(4500,async()=>{
    try {
        await connection;
        console.log(`listening on port 4500`);
        console.log("db connected")
    } catch (error) {
        console.log({error:error.message});
    }
})