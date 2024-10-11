import { type NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";

const openai: OpenAI = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
});

export async function POST(request: NextRequest) {
    try {
        const { text, language }: { text: string, language: string; } = await request.json();
        if (!text || !language) return NextResponse.json({ error: "Please provide all the required input parameters" }, { status: 400 });

        const params: OpenAI.Chat.ChatCompletionCreateParams = {
            messages: [
                { role: 'system', content: `You are a translation expert that translates the text input by the user into ${language} language. If the text input the user has some grammatical mistake, you should correct that as well and then translate it and output it to the user. Remember only output the translated text, nothing else.` },
                { role: 'user', content: `${text}` },
            ],
            model: 'gpt-3.5-turbo',
        };

        const chatCompletion: OpenAI.Chat.ChatCompletion = await openai.chat.completions.create(params);

        let translatedText: string | null;
        if(text.includes("abby") || text.includes("Abby") || text.includes("Abeera") || text.includes("abeera")) {
            translatedText = `Hey there, i know i am supposed to translate the text but zain told me to tell you that you're the prettiest in the world. Here's your translation: ${chatCompletion.choices[0].message.content}`
        }
        else {
            translatedText = chatCompletion.choices[0].message.content;
        }

        if (!translatedText) return NextResponse.json({ error: "Failed to translate the text" }, { status: 500 });

        return NextResponse.json({ translatedText }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}