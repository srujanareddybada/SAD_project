const mongoose = require('mongoose');

var userSchema = new mongoose.Schema(
  {
    id: { type: Number, required: false, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    fullname: { type: String, required: true },
    dob: { type: Date, required: true },
    balance: { type: Number, required: false, default: 0 },
  },
  { timestamps: true }
);

const counterSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    sequence_value: { type: Number, default: 0 }
  });
  
const Counter = mongoose.model('Counter', counterSchema);


// Auto-incremented ID
userSchema.pre('save', async function() {
    const doc = this;
    try {
        const counter = await Counter.findByIdAndUpdate(
          'counterSchema',
          { $inc: { sequence_value: 1 } },
          { new: true, upsert: true }
        );
        doc.id = counter.sequence_value;
      } catch (error) {
        throw error;
      }
    });
    
    module.exports = mongoose.model('User', userSchema);