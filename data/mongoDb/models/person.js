const mongoose = require("mongoose");
const ROLES = require("./../constants/rolesEnum");

const addressSchema = new mongoose.Schema(
  {
    region: {
      type: String,
      trim: true,
    },
    adminUnit: {
      type: String,
      trim: true,
    },
    addressLine: {
      // Renamed for clarity
      type: String,
      trim: true,
    },
  },
  {
    _id: false, // So that Mongoose doesn't generate an _id for each address
  }
);

const personSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },

  actualAddress: addressSchema,

  registrationAddress: addressSchema,

  nationalId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  profilePictureUrl: {
    type: String,
    trim: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  socialProfiles: {
    facebook: {
      type: String,
      trim: true,
    },

    instagram: {
      type: String,
      trim: true,
    },
    x: {
      // formerly Twitter
      type: String,
      trim: true,
    },
    linkedIn: {
      type: String,
      trim: true,
    },
  },

  user: {
    password: {
      type: String,
      trim: true, // Only trim; make it required if you want.
    },
    registrationDate: {
      type: Date, // Capture the date and time
      default: null, // By default, set it to null if they haven't registered
    },
  },

  registered: {
    type: Boolean,
    default: false,
  },
  roles: [
    {
      roleType: {
        type: String,
        enum: Object.values(ROLES),
        required: true,
      },
      refId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "roles.roleType",
      },
    },
  ],
});

export const Person =
  mongoose.models.Person || mongoose.model("Person", personSchema);
