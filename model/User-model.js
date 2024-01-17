import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    adminId: {
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
    accept: Boolean

},
    {
        timestamps: true
    }
)


const UserdModel = mongoose.model('user', UserSchema)
module.exports = UserdModel