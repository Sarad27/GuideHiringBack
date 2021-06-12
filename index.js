const express = require('express');
const app = express();
const cors = require('cors')
const connectToMongoDb = require('./config/db')
const ApiRoutes = require('./routes/index')
const path = require('path')

app.use(cors());

connectToMongoDb();


const directory = path.join(__dirname, '/uploads');
app.use('/uploads', express.static(directory));


app.use('/api', ApiRoutes);

app.get('/', (req,res) =>{
    res.status(200).json({message: "HELLO FROM NODE"})
})

app.listen(5000, ()=>{
    console.log("Server running on port 5000")
})