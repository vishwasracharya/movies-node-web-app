const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *  schemas:
 *   Generals:
 *    type: object
 *    required:
 *     - name
 *    properties:
 *     name:
 *      type: string
 *      description: Any Random Name
 *    example:
 *      name: The Godfather
 */

const generalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const General = mongoose.model('General', generalSchema);
module.exports = General;
