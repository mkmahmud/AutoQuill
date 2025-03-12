import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const chatId = searchParams.get("chatId");

        if (!chatId) {
            return NextResponse.json({ success: false, error: "Chat ID is required" }, { status: 400 });
        }

        // @ts-ignore
        const messages = await prisma.message.findMany({
            where: { chatId },
            orderBy: { createdAt: "asc" }
        });

        return NextResponse.json({ success: true, messages }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Error fetching messages" }, { status: 500 });
    }
}
