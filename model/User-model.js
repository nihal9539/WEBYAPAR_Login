const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    userId: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    name: String,
    photo: {
        type: String
    },
    accept: {
        type: Boolean,
        default: false
    }

},
    {
        timestamps: true
    }
)


const UserdModel = mongoose.model('user', UserSchema)
module.exports = UserdModel