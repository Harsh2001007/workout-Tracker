import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API });

export async function POST(request: Request) {
  try {
    const { exerciseName } = await request.json();

    if (!exerciseName) {
      return Response.json(
        { error: "Exercise name is required" },
        { status: 400 }
      );
    }

    const prompt = `
You are a fitness coach.
You are given an exercise, provide clear instructions on how to perform the exercise. Include if any equipment is required.
Explain the exercise in detail and for a beginner.

The exercise name is: ${exerciseName}

Keep it short and concise. Use markdown formatting.

Use the following format:

Equipment Required
Instructions
Tips
Variations
Safety

keep spacing between the headings and the content.

Always use headings and subheadings.
    `;

    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = response.text || "No response text";

    console.log("data from gemini -> ", text);

    // ✅ Return to frontend
    return Response.json({ message: text }, { status: 200 });
  } catch (error) {
    console.error("AI API error:", error);
    return Response.json(
      { error: "Something went wrong while generating AI guidance" },
      { status: 500 }
    );
  }
}
