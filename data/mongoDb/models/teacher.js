const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const teacherSchema = new mongoose.Schema({
  classTaught: [
    {
      classId: { type: mongoose.Schema.Types.ObjectId, ref: "CurrentClass" },
      subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" },
    },
  ],
  grade: { type: mongoose.Schema.Types.ObjectId, ref: "GradeEntry" },
  quiz: [{ type: Schema.Types.ObjectId, ref: "QuizEntry" }],
  socialProfile: [
    {
      icon: { type: String },
      url: {
        type: String,
        validate: {
          validator: function (url) {
            return url.includes("facebook") || url.includes("instagram");
          },
          message: (props) => `${props.value} is not a valid URL!`,
        },
      },
    },
  ],
});

teacherSchema.pre("save", function (next) {
  this.socialProfile.forEach((profile) => {
    if (profile.url.includes("facebook")) {
      profile.icon = "icon-facebook";
    } else if (profile.url.includes("instagram")) {
      profile.icon = "icon-instagram";
    }
  });
  next();
});

export const Teacher =
  mongoose.models.Teacher || mongoose.model("Teacher", teacherSchema);
