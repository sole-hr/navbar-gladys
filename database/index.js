const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://admin:password42@mattmongodb-o9nhb.mongodb.net/fike?retryWrites=true&w=majority`, {useNewUrlParser: true});
// const shoes = require('../../shoe-data-generator/shoeData.json');

let shoeSchema = mongoose.Schema({
  productName: String,
  category: String,
  sku: String,
  brand: String,
  price: Number,
  images: [String]
});

let Shoes = mongoose.model('Shoes', shoeSchema);

let searchShoes = (obj, callBack) => {
  Shoes.find({productName: {$regex: '.*' + `${obj}` + '.*' }})
    .limit(6)
    .sort({productName:1})
    .then((docs) => {callBack(null, docs)});
};

let searchShoe = (obj, callBack) => {
  Shoes.findOne({ "sku": `${obj}` })
    .select('images productName price sku')
    .then((docs) => {callBack(null, docs)})
};

//for setting up initial database

// let save = (data) => {
//     console.log('inside of save: ', data[0])
//     Shoes.insertMany(data, (err) => {
//         if (err) {
//             console.log('insertion error: ', err)
//         }
//         console.log('attempting to update')
//         Shoes.update(data, { upsert: true })
//     });
// };

//uncomment below 
//save(shoes);

module.exports.searchShoes = searchShoes;
module.exports.searchShoe = searchShoe;