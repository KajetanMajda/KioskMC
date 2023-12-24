const express = require('express');
const databaseConnection = require('./DatabaseConnection');
const showProducts = require('./Endpoints/ShowProducts');
const showProductsName = require('./Endpoints/ShowProductsName');
const showProductsNameIngredients = require('./Endpoints/ShowProductsNameIngredients');
const showProductDefaultName = require('./Endpoints/ShowProductDefaultName');

const app = express();
const port = 3030;

databaseConnection();

app.use(showProducts);
app.use(showProductsName);
app.use(showProductsNameIngredients);
app.use(showProductDefaultName);


app.listen(port, () => {
    console.log(`Application works on port: ${port}`);
});