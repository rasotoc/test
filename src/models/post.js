const mongoose = require('mongoose');

const PostSchema =mongoose.Schema({
    uuid: {
        type: String,
        require: true
    },
    created: {
        default:Date.now,
        type: Date
    },
    updated: {
        default:Date.now,
        type: Date
    },
    quantity: String,
    cost: Boolean,
    tax: Boolean,
    status: {
        default:null,
        type: String
    },
    img: String,
    img_url: String
})

module.exports = mongoose.model('xnitoInfo',PostSchema);