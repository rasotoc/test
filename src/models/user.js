const mongoose = require('mongoose');

const PostSchema =mongoose.Schema({
    name: {
        type: String,
        require: true,
        min: 4,
        max:100
    },
    email: {
        type: String,
        require: true,
        min: 4,
        max:100
    },
    password: {
        type: String,
        require: true,
        min: 4,
        max:100
    },
    created: {
        default:Date.now,
        type: Date
    }
})

module.exports = mongoose.model('users',PostSchema);