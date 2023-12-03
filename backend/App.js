const express = require('express');
const { Int32 } = require('mongodb');
const app = express();
const port = 3000;

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

const travelSchema = new mongoose.Schema({
    name: String,
    image: String,
    // inne pola według potrzeb
});

// Tworzysz model dla kolekcji na podstawie schematu
const TravelModel = mongoose.model('countries', travelSchema);


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
                // Pobierasz wszystkie dokumenty z kolekcji
                const documents = await TravelModel.find({});

                // Zwracasz pobrane dokumenty jako JSON w odpowiedzi do klienta
                res.json(documents);
            } catch (error) {
                console.error('Error retrieving data from collection:', error);
                res.status(500).send('Internal Server Error');
            } finally {
                // Zamykanie połączenia po zakończeniu operacji
                mongoose.connection.close();
            }
        });
    }

}

module.exports = new Database();

