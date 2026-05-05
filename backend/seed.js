require('dotenv').config();
const mongoose = require('mongoose');
const ProductsModel = require('./Schemas/ProductsSchema');

const products = [
    {
        id: 1,
        name: 'Big Mac',
        image: 'https://placehold.co/400x300?text=Big+Mac',
        price: 14,
        cuisine: 'American',
        minQuantity: 1,
        maxQuantity: 10,
        ingredients: [
            { name: 'Beef patty', quantity: 2, isEditable: false, minQuantity: 2, maxQuantity: 2 },
            { name: 'Lettuce', quantity: 1, isEditable: true, minQuantity: 0, maxQuantity: 3 },
            { name: 'Cheese', quantity: 1, isEditable: true, minQuantity: 0, maxQuantity: 2 },
            { name: 'Pickles', quantity: 2, isEditable: true, minQuantity: 0, maxQuantity: 5 },
            { name: 'Special sauce', quantity: 1, isEditable: true, minQuantity: 0, maxQuantity: 3 },
        ],
    },
    {
        id: 2,
        name: 'McChicken',
        image: 'https://placehold.co/400x300?text=McChicken',
        price: 12,
        cuisine: 'American',
        minQuantity: 1,
        maxQuantity: 10,
        ingredients: [
            { name: 'Chicken patty', quantity: 1, isEditable: false, minQuantity: 1, maxQuantity: 1 },
            { name: 'Lettuce', quantity: 1, isEditable: true, minQuantity: 0, maxQuantity: 3 },
            { name: 'Mayonnaise', quantity: 1, isEditable: true, minQuantity: 0, maxQuantity: 3 },
        ],
    },
    {
        id: 3,
        name: 'Filet-O-Fish',
        image: 'https://placehold.co/400x300?text=Filet-O-Fish',
        price: 13,
        cuisine: 'American',
        minQuantity: 1,
        maxQuantity: 10,
        ingredients: [
            { name: 'Fish fillet', quantity: 1, isEditable: false, minQuantity: 1, maxQuantity: 1 },
            { name: 'Tartar sauce', quantity: 1, isEditable: true, minQuantity: 0, maxQuantity: 3 },
            { name: 'Cheese', quantity: 1, isEditable: true, minQuantity: 0, maxQuantity: 1 },
        ],
    },
    {
        id: 4,
        name: 'McWrap',
        image: 'https://placehold.co/400x300?text=McWrap',
        price: 15,
        cuisine: 'Mediterranean',
        minQuantity: 1,
        maxQuantity: 10,
        ingredients: [
            { name: 'Chicken strips', quantity: 3, isEditable: true, minQuantity: 1, maxQuantity: 5 },
            { name: 'Lettuce', quantity: 1, isEditable: true, minQuantity: 0, maxQuantity: 3 },
            { name: 'Tomato', quantity: 2, isEditable: true, minQuantity: 0, maxQuantity: 4 },
            { name: 'Ranch sauce', quantity: 1, isEditable: true, minQuantity: 0, maxQuantity: 3 },
        ],
    },
    {
        id: 5,
        name: 'McFlurry Oreo',
        image: 'https://placehold.co/400x300?text=McFlurry+Oreo',
        price: 10,
        cuisine: 'Dessert',
        minQuantity: 1,
        maxQuantity: 5,
        ingredients: [
            { name: 'Soft serve', quantity: 1, isEditable: false, minQuantity: 1, maxQuantity: 1 },
            { name: 'Oreo pieces', quantity: 3, isEditable: true, minQuantity: 1, maxQuantity: 6 },
        ],
    },
];

async function seed() {
    await mongoose.connect(process.env.MONGO_URI);
    await ProductsModel.deleteMany({});
    await ProductsModel.insertMany(products);
    console.log(`Seeded ${products.length} products into KioskMC database.`);
    await mongoose.disconnect();
}

seed().catch(err => {
    console.error(err);
    process.exit(1);
});
