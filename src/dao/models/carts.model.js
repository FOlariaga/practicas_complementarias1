import mongoose from 'mongoose';

mongoose.pluralize(null);

const collection = 'carts';

const schema = new mongoose.Schema({

    products: {}

});

const model = mongoose.model(collection, schema);

export default model;