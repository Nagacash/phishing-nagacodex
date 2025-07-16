import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResultType } from "../types";

// Ensure the API key is available in the environment variables
if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    riskLevel: {
      type: Type.STRING,
      enum: ['Low', 'Medium', 'High'],
      description: 'The overall risk level of the email.'
    },
    summary: {
      type: Type.STRING,
      description: 'A brief, one-sentence summary of the analysis.'
    },
    characteristics: {
      type: Type.ARRAY,
      description: 'A list of suspicious elements found in the email.',
      items: {
        type: Type.OBJECT,
        properties: {
          feature: {
            type: Type.STRING,
            description: 'The name of the suspicious feature (e.g., "Urgent Language", "Suspicious Link").'
          },
          suspiciousText: {
            type: Type.STRING,
            description: 'The specific text from the email that is suspicious.'
          },
          explanation: {
            type: Type.STRING,
            description: 'A brief explanation of why this feature is a red flag.'
          }
        },
        required: ['feature', 'suspiciousText', 'explanation']
      }
    }
  },
  required: ['riskLevel', 'summary', 'characteristics']
};

export async function analyzeEmail(emailContent: string): Promise<AnalysisResultType> {
  const systemInstruction = `You are a cybersecurity expert specializing in phishing detection. Analyze the user's email content and provide a structured JSON response. Adhere strictly to the provided schema. Identify the risk level, summarize your findings, and detail the specific suspicious characteristics, explaining why they are red flags.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Please analyze the following email content:\n\n---\n\n${emailContent}`,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: analysisSchema,
      }
    });
    
    const jsonText = response.text.trim();
    // In case the model wraps the JSON in markdown
    const cleanedJson = jsonText.replace(/^```json\s*|```$/g, '');
    return JSON.parse(cleanedJson) as AnalysisResultType;

  } catch (error) {
    console.error('Error during Gemini API call for analysis:', error);
    throw new Error('Failed to get analysis from AI. The model may have returned an invalid response.');
  }
}

export async function generateTrainingEmail(prompt: string): Promise<string> {
  const systemInstruction = `You are an AI assistant for creating cybersecurity training materials. Generate a realistic-looking phishing email based on the user's prompt. CRITICAL: Do not include real links or harmful content. ALL links MUST be replaced with the exact placeholder text: '[PHISHING_LINK_PLACEHOLDER]'. The email must be for educational purposes only.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generate a phishing email based on this scenario: "${prompt}"`,
      config: {
        systemInstruction
      }
    });

    return response.text;
  } catch (error) {
    console.error('Error during Gemini API call for generation:', error);
    throw new Error('Failed to generate training email from AI.');
  }
}