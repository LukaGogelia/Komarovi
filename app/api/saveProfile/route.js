import { z } from "zod";
import bcrypt from "bcryptjs";
import Person from "@/data/mongoDb/models/person";
import { NextResponse } from "next/server";
import dbConnect from "@/data/mongoDb/utils/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

import { georgiaRegions } from "@/data/georgiaRegions";

const AddressSchema = z
  .object({
    region: z.string().optional(),
    adminUnit: z.string().optional(),
  })
  .refine(
    (data) => {
      console.log("Provided Region:", data.region);
      console.log("Expected Regions:", Object.keys(georgiaRegions));
      console.log("Provided Admin Unit:", data.adminUnit);
      console.log("Expected Units for Region:", georgiaRegions[data.region]);

      if (!data.region && !data.adminUnit) return true;

      if (!Object.keys(georgiaRegions).includes(data.region)) {
        return false;
      }

      const isValidUnit =
        georgiaRegions[data.region]?.includes(data.adminUnit) || false;

      if (!isValidUnit) {
        throw new z.ZodError([
          {
            code: z.ZodIssueCode.custom,
            message: "Invalid administrative unit for the provided region",
            path: ["adminUnit"],
          },
        ]);
      }
      return true;
    },
    {
      message: "Invalid administrative unit for the provided region",
      path: ["adminUnit"],
    }
  );

const isCloudinaryUrl = (url) => {
  const cloudinaryRegex = /^https:\/\/res\.cloudinary\.com\/[a-zA-Z0-9]*\/image\/upload\/.*$/;
  return cloudinaryRegex.test(url);
};

const EditProfileSchema = z.object({
  profilePictureUrl: z.string().refine(isCloudinaryUrl, {
    message: "Profile picture URL must be a valid Cloudinary URL",
  }),
  email: z.string().email().or(z.literal("")),
  phone: z
    .string()
    .regex(/^(?:\+?|0+?)[0-9()\-\s]{5,20}$/)
    .or(z.literal("")),
  actualAddress: AddressSchema,
  registrationAddress: AddressSchema,
  password: z.string().min(6), // Assuming minimum password length is 6. Adjust as needed.
});

export async function PUT(request) {
  try {
    dbConnect();
    const body = await request.json();

    const validationResult = EditProfileSchema.safeParse(body);

    if (!validationResult.success) {
      const errorMessages = validationResult.error.issues.map((issue) => {
        return `${issue.path.join(".")}: ${issue.message}`;
      });
      return NextResponse.json({ errors: errorMessages }, { status: 400 });
    }

    const session = await getServerSession(authOptions);
    console.log(body);
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "You must be authenticated to update the profile." },
        { status: 401 }
      );
    }

    const userId = session.user.name;

    // Fetch user from DB
    const personFromDb = await Person.findOne({ _id: userId });
    if (!personFromDb) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    // Check provided password against hashed one in DB
    const isValidPassword = await bcrypt.compare(
      body.password,
      personFromDb.user.password
    );
    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Incorrect password." },
        { status: 403 }
      );
    }

    // Update specific fields
    const updateFields = {
      email: body.email,
      phone: body.phone,
      actualAddress: body.actualAddress,
      registrationAddress: body.registrationAddress,
      profilePictureUrl: body.profilePictureUrl,  // Assuming the image URL is passed in the body
    };


    const updatedPerson = await Person.findOneAndUpdate(
      { _id: userId },
      { $set: updateFields },
      { new: true }
    );

    return NextResponse.json({
      message: "Profile fields successfully updated",
      updatedPerson,
    });
  } catch (error) {
    console.error("Unhandled Error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
