
import { GoogleGenAI } from "@google/genai";
import { ArtStyle, AspectRatio } from "../types";

export const generateArtImage = async (
  prompt: string,
  style: ArtStyle,
  aspectRatio: AspectRatio,
  sourceImageBase64?: string
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const finalPrompt = sourceImageBase64 
    ? `${prompt}. Modify the provided image in ${style} style. Ensure the result is artistic and detailed.`
    : `${prompt}. Render this in ${style} style with exquisite detail and high artistic quality.`;

  try {
    const parts: any[] = [{ text: finalPrompt }];
    
    if (sourceImageBase64) {
      // Remove data URL prefix if present
      const base64Data = sourceImageBase64.split(',')[1] || sourceImageBase64;
      parts.unshift({
        inlineData: {
          mimeType: 'image/png', // Assume PNG or extract from prefix
          data: base64Data,
        }
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio,
        },
      },
    });

    if (!response.candidates?.[0]?.content?.parts) {
      throw new Error("Failed to generate image: No parts in response");
    }

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64Data = part.inlineData.data;
        return `data:${part.inlineData.mimeType};base64,${base64Data}`;
      }
    }

    throw new Error("No image data found in model response");
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
