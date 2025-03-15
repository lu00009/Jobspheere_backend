import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: Number, required: true },
  description: { type: String, required: true },
  logo: { type: String, required: true },
  experience: { type: String, required: true },
  currency: { type: String, required: true },
  isBookMarked: { type: Boolean, required: true  },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Job = mongoose.model('Job', jobSchema);
export default Job;
