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
      conventional: Boolean,
      muslim: Boolean,
      christian: Boolean,
    }, required: true
  },
  school_class: {
    type: {
      private: Boolean,
      public: Boolean
    }, required: true
  },
  school_section: {
    type: {
      creche: Boolean,
      nursery: Boolean,
      after_school: Boolean,
      primary: Boolean,
      junior_secondary: Boolean,
      senior_secondary: Boolean
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
    status: Boolean
  },
  school_type: {
    type: {
      day_school: Boolean,
      boarding: Boolean
    }, required: true
  },
  school_images: {
    creche: { type: Array },
    nursery: { type: Array },
    after_school: { type: Array },
    primary: { type: Array },
    junior_secondary: { type: Array },
    senior_secondary: { type: Array },
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

SchoolsSchema.index({ school_name: "text" })
const Schools = mongoose.model('Schools', SchoolsSchema);


export default Schools;
