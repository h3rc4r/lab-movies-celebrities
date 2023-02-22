//  Add your code here
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const celebritySchema = new Schema(
    {
        name: String,
        occupation: String,
        catchPhrase: { type: String, required: true },
        
    }
    , {
        timestamps: true
    }
)

module.exports = mongoose.model('Celebrity', celebritySchema);