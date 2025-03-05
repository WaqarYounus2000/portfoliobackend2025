const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  personalInfo: {
    profileUrl: { type: String, default: '' },
    name: { type: String, },
    title: { type: String, },
    type: { type: String, },
    tagline: { type: String, },
    description_1: { type: String, },
    description_2: { type: String, },
    contact: [{ type: String }],
    getInTouch: {
      primaryGmail: { type: String },
      primaryPhone: { type: String },
      secondaryPhone: { type: String },
      secondaryGmail: { type: String },
    },
  },
  education: [
    {
      level: String,
      year: String,
      location: String,
      degree: String,
      institute: String
    }
  ],
  experience: [
    {
      position: String,
      company: String,
      location: String,
      current: Boolean,
      responsibilities: [String]
    }
  ],
  skills: {
    frontend: { type: [String], default: [] },
    backend: { type: [String], default: [] },
    database: { type: [String], default: [] },
    others: { type: [String], default: [] }
  },
  projects: [
    {
      name: String,
      imageUrl: String,
      description: String,
      url: String
    }
  ],
  certificates: [
    {
      name: String,
      platform: String,
      description: String
    }
  ],
  declaration: {
    statement: String,
    signature: {
      name: String,
      location: String,
      year: String
    }
  },
  relatedLinks: [String],
  socialmedia: {
    facebook: { type: String },
    instagram: { type: String },
    linkedin: { type: String },
    github: { type: String }
  },

  resumefile : {
    name:{type:String},
    pdflink : {type:String},
    pdfsize:{type:Number}
  }
});

// Use a single document to store the resume


const ResumeCollection = mongoose.model("Resume", resumeSchema);


module.exports = ResumeCollection;