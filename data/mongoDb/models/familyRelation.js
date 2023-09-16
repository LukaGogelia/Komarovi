const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const personSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,

  familyPosition: {
    type: String,
    enum: ["mother", "father", "child"],
  },
});

const familyRelationSchema = new mongoose.Schema({
  mother: personSchema,
  father: personSchema,
  children: [personSchema],
});

export const FamilyRelation =
  mongoose.models.FamilyRelation ||
  mongoose.model("FamilyRelation", familyRelationSchema);
