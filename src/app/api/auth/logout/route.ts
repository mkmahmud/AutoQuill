import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { token } = await req.json();

        // Find and delete the session
        // @ts-ignore
        await prisma.session.deleteMany({
            where: { token }
        });

        return NextResponse.json({ success: true, message: "Logged out successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error logging out:", error);
        return NextResponse.json({ success: false, error: "Error logging out" }, { status: 500 });
    }
}
