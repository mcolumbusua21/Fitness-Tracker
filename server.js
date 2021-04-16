const express = require('express');
const logger = require('morgan');
const app = express();
const routes = require('./routes')

const mongoose = require("mongoose");

const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(express.static('public'));

app.use(routes);

app.listen(PORT, () => {
    console.log(`App running on port http://localhost:${PORT}!`); 
})
