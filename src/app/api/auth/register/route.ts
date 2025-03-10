import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json();

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json({ success: false, error: "User already exists" }, { status: 400 });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await prisma.user.create({
            //@ts-ignore 
            data: { name, email, password: hashedPassword },
        });

        return NextResponse.json({ success: true, user: newUser }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Error registering user" }, { status: 500 });
    }
}
