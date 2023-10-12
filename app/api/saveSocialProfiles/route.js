import { z } from "zod";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import dbConnect from "@/data/mongoDb/utils/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import Person from "@/data/mongoDb/models/person";

const isValidURL = (url) => {
    const pattern = new RegExp(
        "^(https?:\\/\\/)?" +
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        "(\\#[-a-z\\d_]*)?$",
        "i"
    );
    return !!pattern.test(url);
};

// Schema definition using the custom URL validation
const SocialProfilesSchema = z.object({
    facebook: z.string().optional().refine(isValidURL, { message: "Invalid URL" }).or(z.literal("")),
    instagram: z.string().optional().refine(isValidURL, { message: "Invalid URL" }).or(z.literal("")),
    x: z.string().optional().refine(isValidURL, { message: "Invalid URL" }).or(z.literal("")),
    linkedIn: z.string().optional().refine(isValidURL, { message: "Invalid URL" }).or(z.literal("")),
    password: z.string().min(6),
});



export async function PUT(request) {
    try {
        dbConnect();

        const body = await request.json();

        const validationResult = SocialProfilesSchema.safeParse(body);

        if (!validationResult.success) {
            const errorMessages = validationResult.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`);
            return NextResponse.json({ errors: errorMessages }, { status: 400 });
        }

        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ error: "You must be authenticated to update the social profiles." }, { status: 401 });
        }

        const userId = session.user.name;

        // Fetch user from DB
        const personFromDb = await Person.findOne({ _id: userId });
        if (!personFromDb) {
            return NextResponse.json({ error: "User not found." }, { status: 404 });
        }

        // Check provided password against hashed one in DB
        const isValidPassword = await bcrypt.compare(body.password, personFromDb.user.password);
        if (!isValidPassword) {
            return NextResponse.json({ error: "Incorrect password." }, { status: 403 });
        }

        // Update social profiles
        personFromDb.socialProfiles = {
            ...personFromDb.socialProfiles,
            ...body,
        };
        await personFromDb.save();

        return NextResponse.json({ message: "Social profiles successfully updated" });
    } catch (error) {
        console.error("Unhandled Error:", error);
        return NextResponse.json({ error: "Internal server error." }, { status: 500 });

    }
}