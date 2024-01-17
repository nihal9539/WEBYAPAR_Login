const mongoose = require('mongoose')
const AdminSchema = mongoose.Schema({
    adminId: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },

},
    {
        timestamps: true
    }
)


const AdmindModel = mongoose.model('admin',AdminSchema )
module.exports = AdmindModel