const mongoose = require('mongoose');
const ProfileSchema = new mongoose.Schema({
  //reference purpose
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  // simple object
  collegeName: {
    type: String,
    required: true,
  },

  targetExam: {
    type: [String],
    required: true,
  },
  stream: {
    type: String,
    required: true,
  },
  ifit: {
    type: Boolean,
    required: true,
  },
  collegeName: {
    type: String,
    required: true,
  },
  //array of strings
  skills: {
    type: [String],
    required: true,
  },
  bio: {
    type: String,
  },
  //object of objects
  social: {
    instagram: {type: String},
    facebook: {type: String},
    telegram: {type: String},
    linkedin: {type: String},
    githubUsername: {type: String},
  },
  // user persnol data
  persnol: {
    age: {type: Number},
    tenthschool: {type: String},
    twelfthschool: {type: String},
    twelvethpercentage: {type: Number},
    // twelvethpercentage: {type: Number, required: true},
    // temthpercentage: {type: Number, required: true},
    temthpercentage: {type: Number},
    collegepercentage: {type: Number},
    achivements: {type: [String]},
  },
  //array of objects ex:[{age,tenthschool,...},{age,tenthschool,...},{age,tenthschool,...}]
  experience: [
    {
      title: {
        type: String,
        required: true,
      },
      company: {
        type: String,
        required: true,
      },
      location: {
        type: String,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: [String],
      },
    },
  ],
  projects: [
    {
      projectTitle: {
        type: String,
        required: true,
      },

      projectDescription: {
        type: [String],
      },
    },
  ],
});
const Profile = mongoose.model('userdetail', ProfileSchema);
module.exports = Profile;
