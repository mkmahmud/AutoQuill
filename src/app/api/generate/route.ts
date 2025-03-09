import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();
        const response = await openai.chat.completions.create({
            model: "gpt-4-turbo",
            messages: [{ role: "developer", content: prompt }],
            max_tokens: 500,
        });

        return NextResponse.json({ result: response.choices[0].message.content });
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
