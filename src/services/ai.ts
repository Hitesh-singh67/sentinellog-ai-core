import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  throw new Error('Missing GEMINI_API_KEY credential.');
}

const aiClient = new GoogleGenAI({ apiKey });

export class AIService {
  /**
   * Generates a precise, one-sentence attack assessment profile using AI when risk rules trigger
   */
  static async generateThreatProfile(ip: string, statusCode: number, rawPayload: string): Promise<string> {
    const prompt = `Analyze this suspicious network packet log and write a concise, one-sentence incident summary detailing the probable threat vector.
    IP Context: ${ip}
    HTTP Status Code: ${statusCode}
    Raw Ingestion Payload: ${rawPayload}
    
    Threat Profile Summary:`;

    try {
      const response = await aiClient.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      return response.text?.trim() || 'Warning: Potential vector anomaly discovered without automated breakdown.';
    } catch (err) {
      console.error('AI Core Service Communication Timeout:', err);
      return 'AI Generation Fault: Internal processing engine pipeline dropped the response structure.';
    }
  }
}
