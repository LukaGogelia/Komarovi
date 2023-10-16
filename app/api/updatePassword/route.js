import { z } from "zod";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import dbConnect from "@/data/mongoDb/utils/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import Person from "@/data/mongoDb/models/person";

// Schema definition
const UpdatePasswordSchema = z.object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your new password")
});

export async function PUT(request) {
    try {
        dbConnect();

        const body = await request.json();

        // Validate body using schema
        const validationResult = UpdatePasswordSchema.safeParse(body);

        if (!validationResult.success) {
            const errorMessages = validationResult.error.issues.map(issue => `${issue.path.join(".")}: ${issue.message}`);
            return NextResponse.json({ errors: errorMessages }, { status: 400 });
        }

        // Validate session
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized: You must be authenticated to update the password." }, { status: 401 });
        }
        const userId = session.user.name;
        const { currentPassword, newPassword, confirmPassword } = body;

        // Validate newPassword and confirmPassword
        if (newPassword !== confirmPassword) {
            return NextResponse.json({ error: "New passwords do not match" }, { status: 400 });
        }

        // Fetch user from DB
        const personFromDb = await Person.findById(userId);
        if (!personFromDb) {
            return NextResponse.json({ error: "User not found." }, { status: 404 });
        }

        // Check provided password against hashed one in DB
        const isValidPassword = await bcrypt.compare(currentPassword, personFromDb.user.password);
        if (!isValidPassword) {
            return NextResponse.json({ error: "Current password is incorrect." }, { status: 403 });
        }

        // Hash new password and update it in the database
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        personFromDb.user.password = hashedNewPassword;
        await personFromDb.save();

        return NextResponse.json({ message: "Password updated successfully" });
    } catch (error) {
        console.error("Unhandled Error:", error);
        return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }
}
