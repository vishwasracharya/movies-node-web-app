const mongoose = require('mongoose');

const generalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const General = mongoose.model('General', generalSchema);
module.exports = General;
