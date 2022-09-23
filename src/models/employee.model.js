const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

const employeeSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    employeeName: {
        type: String,
    },
    phone: {
        type: String
    }
}, { timestamps: true }
)

employeeSchema.plugin(mongoosePaginate);
const Employee = mongoose.model('Employee', employeeSchema)


module.exports = Employee
