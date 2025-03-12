import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();


export async function POST(req: Request) {
    try {
        const { chatId, sender, content, aiResponse } = await req.json();

        // Save user message
        // @ts-ignore
        const userMessageEntry = await prisma.message.create({
            data: {
                chatId,
                sender: "user",
                content: content,
            },
        });

        // Save AI response
        // @ts-ignore
        const aiMessageEntry = await prisma.message.create({
            data: {
                chatId,
                sender: "ai",
                content: aiResponse,
            },
        });

        return NextResponse.json({ success: true, messages: [userMessageEntry, aiMessageEntry] }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Error saving messages" }, { status: 500 });
    }
}
