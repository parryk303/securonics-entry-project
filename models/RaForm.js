const mongoose = require('mongoose');

const RaFormSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    unique: true,
    trim: true,
    maxlength: [40, 'Title cannot be more than 40 characters']
  },
  th0: {
    type: String,
  },
  th1: {
    type: String,
  },
  th2: {
    type: String,
  },
  th3: {
    type: String,
  },
  th4: {
    type: String,
  },
  th5: {
    type: String,
  },
  th6: {
    type: String,
  },
  th7: {
    type: String,
  },
  th8: {
    type: String,
  },
  th9: {
    type: String,
  },
  th10: {
    type: String,
  },
  vm0: {
    type: String,
  },
  vm1: {
    type: String,
  },
  vm2: {
    type: String,
  },
  vm3: {
    type: String,
  },
  vm4: {
    type: String,
  },
  vm5: {
    type: String,
  },
  vm6: {
    type: String,
  },
  vm7: {
    type: String,
  },
  vm8: {
    type: String,
  },
  vm9: {
    type: String,
  },
  vm10: {
    type: String,
  },
  vm11: {
    type: String,
  },
})

module.exports = mongoose.models.RaForm || mongoose.model('RaForm', RaFormSchema);
