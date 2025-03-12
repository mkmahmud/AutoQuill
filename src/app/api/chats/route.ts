import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const { userId, chatName } = await req.json();
        // @ts-ignore
        const chat = await prisma.chat.create({
            data: {
                userId,
                chatName,
            },
        });

        return NextResponse.json({ success: true, chat }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: "Error creating chat" }, { status: 500 });
    }
}
