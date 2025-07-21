import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const { question } = await request.json();
  const API_KEY: string = `${process.env.GEMINI_API_KEY}`;

  try {
    // const genAI = new GoogleGenerativeAI(JSON.stringify(API_KEY));
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = question;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    // console.log(text);
    return NextResponse.json({ text });
    // return text;
  } catch (error: any) {
    console.error("Error generating text:", error);
    return NextResponse.json({
      error: "An error occurred while generating text.",
    });
  }
};
