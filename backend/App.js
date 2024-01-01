const express = require('express');
const databaseConnection = require('./DatabaseConnection');
const showProducts = require('./Endpoints/ShowProducts');
const showProductsAll = require('./Endpoints/ShowProductsAll');
const showProductsName = require('./Endpoints/ShowProductsName');
const showProductsNameIngredients = require('./Endpoints/ShowProductsNameIngredients');
const showProductDefaultName = require('./Endpoints/ShowProductDefaultName');
const showProductsNameInfo = require('./Endpoints/ShowProductsNameInfo');
const enterOrderInfo = require('./Endpoints/EnterOrderInfo');
const showOrders = require('./Endpoints/ShowOrders');

const app = express();
const port = 3030;

databaseConnection();

app.use(showProducts);
app.use(showProductsName);
app.use(showProductsNameIngredients);
app.use(showProductDefaultName);
app.use(showProductsNameInfo);
app.use(enterOrderInfo);
app.use(showOrders);
app.use(showProductsAll);


app.listen(port, () => {
    console.log(`Application works on port: ${port}`);
});