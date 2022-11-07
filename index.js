require('dotenv').config()
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;


// assignment11-service-review
// 6doGxRqcLhEWFxL3

//middle ware

app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
    res.send("service review running")
});

app.listen(port, () => {
    console.log('server running')
})





