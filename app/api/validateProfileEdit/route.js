import { z } from 'zod';
import Person from '@/data/mongoDb/models/person';
import { NextResponse } from 'next/server';
import dbConnect from '@/data/mongoDb/utils/database';
import { georgiaRegions } from '@/data/georgiaRegions';

const AddressSchema = z.object({
    region: z.string().optional(),
    administrativeUnit: z.string().optional()
}).refine(data => {
    if (!data.region && !data.administrativeUnit) return true;

    if (!Object.keys(georgiaRegions).includes(data.region)) {
        return false;
    }

    const isValidUnit = georgiaRegions[data.region]?.includes(data.administrativeUnit) || false;
    if (!isValidUnit) {
        throw new z.ZodError([
            {
                code: z.ZodIssueCode.custom,
                message: "Invalid administrative unit for the provided region",
                path: ['administrativeUnit'],
            },
        ]);
    }
    return true;
}, {
    message: "Invalid administrative unit for the provided region",
    path: ['administrativeUnit'],
});

const EditProfileSchema = z.object({
    email: z.string().email().or(z.literal('')),
    phone: z.string().regex(/^(?:\+?|0+?)[0-9()\-\s]{5,20}$/).or(z.literal('')),
    actualAddress: AddressSchema,
    registrationAddress: AddressSchema
});

export async function POST(request) {

    try {
        const body = await request.json();

        const validationResult = EditProfileSchema.safeParse(body);

        if (!validationResult.success) {
            const errorMessages = validationResult.error.issues.map(issue => {
                return `${issue.path.join('.')}: ${issue.message}`;
            });
            return NextResponse.json({ errors: errorMessages }, { status: 400 });
        }

        await dbConnect();

        const existingByEmail = await Person.findOne({ email: body.email });
        if (existingByEmail && body.email.length) {
            return NextResponse.json({ error: 'Email already in use' }, { status: 400 });
        }

        const existingByPhone = await Person.findOne({ phone: body.phone });
        if (existingByPhone && body.phone.length) {
            return NextResponse.json({ error: 'Phone number already in use' }, { status: 400 });
        }

        // If all validation passes and no existing user conflicts
        return NextResponse.json({ message: 'Profile data is valid' }, { status: 200 });
    } catch (error) {
        console.error("Unhandled Error:", error);
        return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }

}