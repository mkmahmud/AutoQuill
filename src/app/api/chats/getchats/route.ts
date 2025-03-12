import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json({ success: false, error: "Chat ID is required" }, { status: 400 });
        }


        // @ts-ignore
        const messages = await prisma.chat.findMany({
            where: { userId: userId },
            orderBy: { createdAt: "asc" }
        });

        return NextResponse.json({ success: true, messages }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Error fetching messages" }, { status: 500 });
    }
}
