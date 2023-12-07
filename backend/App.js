const express = require('express');
const { Int32 } = require('mongodb');
const app = express();
const port = 3001;

// Dodaj endpoint do obsługi żądania GET na głównym adresie
app.get('/', (req, res) => {
    res.send('WILOCMEN');
});

// Nasłuchuj na danym porcie
app.listen(port, () => {
    console.log(`Aplication works on port: ${port}`);
    console.log(`http://localhost:${port}`);
});

//----------------------------------------------------------------
const mongoose = require("mongoose");

const server = '127.0.0.1:27017';
const database = 'KioskMC';

const kioskProductsSchema = new mongoose.Schema({
    id: Number,
    name: String,
    image: String,
    price: Number,
    cuisine: String,
    minQuantity: Number,
    maxQuantity: Number,
    ingredients: [
        {
            name: String,
            quantity: Number,
            isEditable: Boolean,
            minQuantity: Number,
            maxQuantity: Number
        }
    ]
});

// Tworzysz model dla kolekcji na podstawie schematu
const KioskProductsModel = mongoose.model('products', kioskProductsSchema);



class Database {
    constructor() {
        this._connect();
        this._setupRoutes();
    }
    _connect() {
        mongoose
            .connect(`mongodb://${server}/${database}`)
            .then(() => {
                console.log('Database connection successful');
            })
            .catch((err) => {
                console.error('Database connection failed');
            });
    }
    _setupRoutes() {
        // Endpoint do pobrania danych z kolekcji i wyświetlenia ich
        app.get('/products', async (req, res) => {
            try {
                // Pobierasz tylko wybrane pola z kolekcji i wykluczasz pole "_id"
                const documents = await KioskProductsModel.find({}, 'name price image cuisine -_id');

                // Zwracasz pobrane dokumenty jako JSON w odpowiedzi do klienta
                res.json(documents);
            } catch (error) {
                console.error('Error retrieving data from collection:', error);
                res.status(500).send('Internal Server Error');
            }
        });

        // Dodajesz dodatkowy endpoint do pobrania pojedynczego produktu na podstawie nazwy
        app.get('/products/:name', async (req, res) => {
            const productName = req.params.name;

            try {
                // Pobierasz pojedynczy produkt na podstawie nazwy
                const product = await KioskProductsModel.findOne({ name: productName }, 'name price image cuisine -_id');

                // Sprawdzasz, czy produkt istnieje
                if (!product) {
                    return res.status(404).json({ error: 'Product not found' });
                }

                // Zwracasz pojedynczy produkt jako JSON w odpowiedzi do klienta
                res.json(product);
            } catch (error) {
                console.error('Error retrieving data from collection:', error);
                res.status(500).send('Internal Server Error');
            }
        });
    }



}

module.exports = new Database();

