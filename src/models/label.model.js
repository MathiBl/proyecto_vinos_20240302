const mongoose = require('mongoose');

const labelSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    wines: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wine',
        required: false
    }],
    cover: {
        type: String,
        required: false
    }
});

const Label = mongoose.model('Label', labelSchema);

module.exports = Label;