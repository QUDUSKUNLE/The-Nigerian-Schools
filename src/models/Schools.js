import mongoose from 'mongoose';

/**
 * @description This is Schools model
 */
const SchoolsSchema = new mongoose.Schema({
  school_name: { type: String, required: true, unique: true },
  school_address: { type: String, required: true },
  school_proprietor: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    name: { type: String }
  },
  school_convention: {
    type: {
      conventional: String,
      muslim: String,
      christian: String,
    }, required: true
  },
  school_class: {
    type: {
      private: String,
      public: String
    }, required: true
  },
  school_section: {
    type: {
      creche: String,
      nursery: String,
      after_school: String,
      primary: String,
      junior_secondary: String,
      senior_secondary: String
    }, required: true
  },
  school_population: {
    type: {
      creche: Number,
      nursery: Number,
      after_school: Number,
      primary: Number,
      junior_secondary: Number,
      senior_secondary: Number,
    },
  },
  school_approval: {
    approved_date: Date,
    status: String
  },
  school_type: {
    type: {
      day_school: String,
      boarding: String,
    }, required: true
  },
  school_images: {
    creche: { type: String },
    nursery: { type: String },
    after_school: { type: String },
    primary: { type: String },
    junior_secondary: { type: String },
    senior_secondary: { type: String },
  },
  school_contacts: {
    type: {
      email: String,
      phone_number: String
    }, required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

SchoolsSchema.index({ school_name: 'text' })
const Schools = mongoose.model('Schools', SchoolsSchema);


export default Schools;
