import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const SECRET_KEY = "Hey Content"; // Use a strong secret key

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        // Find user by email
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
        }

        // Compare password
        // @ts-ignore
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return NextResponse.json({ success: false, error: "Invalid credentials" }, { status: 401 });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });

        // Store session in the database
        // @ts-ignore
        const session = await prisma.session.create({
            data: {
                userId: user.id,
                token: token,
                expiresAt: new Date(Date.now() + 60 * 60 * 1000) // Session expires in 1 hour
            }
        });

        // Send response with the token and session details
        return NextResponse.json({ success: true, token, session, userId: user.id }, { status: 200 });
    } catch (error) {
        console.error("Error logging in:", error);
        return NextResponse.json({ success: false, error: "Error logging in" }, { status: 500 });
    }
}
