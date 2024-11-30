import Groq from "groq-sdk";
import { NextResponse, NextRequest } from "next/server";
import { getPrompt } from "../../../utils/prompt";


const options = {
    model: process.env.MODEL_ID || "llama-3.1-70b-versatile",
    temperature: 0.5,
    max_tokens: 1024,
    top_p: 1,
    stop: null,
    stream: true,
};

export async function POST(req: NextRequest) {
    const assistantName: any = 
        req.nextUrl.searchParams.get("assistantName") || "tatebot";
    
    if (!assistantName) {
        return NextResponse.json({ error: "Invalid path." }, { status: 400 });
    }

    const prompt = getPrompt(assistantName);
    
    if (!prompt) {
        return NextResponse.json({ error: "Not found." }, { status: 404 });
    }

    const data = await req.json();
    const GROQ_API_KEY = process.env.GROQ_API_KEY;
    const groq = new Groq({ apiKey : GROQ_API_KEY });

    const completion = await groq.chat.completions.create({
        messages: [prompt, ...data],
        ...options,
    });

    const stream = new ReadableStream({
        async start(controller) {
            const encoder = new TextEncoder();
            try {
                // @ts-ignore
                for await (let chunk of completion) {
                    const content = chunk.choices[0]?.delta?.content || "";
                    if (content) {
                        controller.enqueue(encoder.encode(content));
                    }
                }
            } catch (err) {
                controller.error(err);
            } finally {
                controller.close();
            }
        },
    });

    return new NextResponse(stream, {
        headers: {
            'Content-Type': 'text/plain',
            'Transfer-Encoding': 'chunked'
        }
    });
}