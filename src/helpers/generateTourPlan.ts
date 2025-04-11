import { GoogleGenerativeAI } from "@google/generative-ai";
export interface TourPlace {
  place: string;
  costperperson: string;
  detailedaddress: string;
  latitude: string;
  longitude: string;
  whythisplace: string;
  todo: string;
  image: string;
}

export interface TourPlanResponse {
  plan: TourPlace[];
  message: string;
}


export async function generateTourPlan(userPrompt: string, existingPlan: TourPlace[] = []): Promise<TourPlanResponse> {
  try {
    const API_KEY = "AIzaSyB8_Gp4CEfuCI5gjBcVcwd-Csbagn_DLOo";
    if (!API_KEY) {
      console.error("Missing Gemini API key");
      return defaultPlanResponse();
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const systemInstructions = `
You are a specialized AI tour planning assistant. Your ONLY function is to create or modify travel itineraries.
You must ALWAYS respond using the exact JSON format specified below, with no additional text or explanations.

Response format requirements:
1. Return a valid JSON object with two properties: "plan" and "message"
2. The "plan" property must be an array of places, each with these EXACT fields:
   - place: Name of the location (string)
   - costperperson: Approximate cost per person (string with currency symbol)
   - detailedaddress: Full address (string)
   - latitude: Latitude coordinate (string)
   - longitude: Longitude coordinate (string)
   - whythisplace: Brief explanation of significance (string, 10-25 words)
   - todo: Suggested activities (string, 10-30 words)
   - image: URL to a representative image (string)
3. The "message" property should be a brief summary of the plan (string, 50-100 words)

STRICT RULES:
- ONLY respond to travel planning requests.
- If asked about anything not related to travel planning, respond with a plan for Paris instead.
- NEVER include explanations, apologies, or text outside the JSON structure.
- NEVER engage in conversations about topics other than travel planning.
- ALWAYS use realistic coordinates for locations.
- For image URLs, use placeholder URLs starting with "https://images.unsplash.com/".
- Include 3-7 places per plan based on the requested duration.
- Ensure all required fields are present and valid.

EXAMPLE RESPONSE:
{
  "plan": [
    {
      "place": "Eiffel Tower",
      "costperperson": "$25",
      "detailedaddress": "Champ de Mars, 5 Avenue Anatole France, 75007 Paris",
      "latitude": "48.8584",
      "longitude": "2.2945",
      "whythisplace": "Iconic symbol of Paris with breathtaking views of the city",
      "todo": "Take photos, visit the observation deck, have a picnic in the Champ de Mars",
      "image": "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f"
    }
  ],
  "message": "I've created a Paris tour plan featuring the iconic Eiffel Tower. This plan gives you the perfect introduction to the city."
}
`;

    const isModification = existingPlan && existingPlan.length > 0;
    
    let aiPrompt = systemInstructions;
    
    if (isModification) {
      aiPrompt += `\n\nEXISTING PLAN TO MODIFY:\n${JSON.stringify(existingPlan, null, 2)}\n\n`;
      aiPrompt += `USER REQUEST: ${userPrompt}\n\n`;
      aiPrompt += "Instructions: Modify the existing plan according to the user's request while maintaining the same structure. Return the complete modified plan.";
    } else {
      aiPrompt += `\n\nUSER REQUEST: ${userPrompt}\n\n`;
      aiPrompt += "Instructions: Create a new tour plan according to the user's request. If no specific location is mentioned, create a plan for Paris, France.";
    }

    console.log("Sending Gemini API prompt");
    const result = await model.generateContent(aiPrompt);
    const response = result.response;
    const textResult = response.text();
    console.log(response.text())
    let parsedResponse;
    try {
      const jsonMatch = textResult.match(/(\{[\s\S]*\})/);
      if (jsonMatch && jsonMatch[0]) {
        parsedResponse = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No valid JSON found in response");
      }
    } catch (parseError) {
      console.error("Error parsing Gemini response:", parseError);
      console.log("Raw response:", textResult);
      return defaultPlanResponse();
    }
    
    return validateAndCleanResponse(parsedResponse);
  } catch (error) {
    console.error("Error generating tour plan with Gemini:", error);
    return defaultPlanResponse();
  }
}

function validateAndCleanResponse(response: any): TourPlanResponse {
  try {
    if (!response.plan || !Array.isArray(response.plan) || response.plan.length === 0) {
      throw new Error("Invalid plan format");
    }
    const validatedPlan = response.plan.map(place => {
      const cleanPlace: TourPlace = {
        place: String(place.place || "Unnamed Location"),
        costperperson: String(place.costperperson || "$0"),
        detailedaddress: String(place.detailedaddress || "Address unavailable"),
        latitude: String(place.latitude || "0"),
        longitude: String(place.longitude || "0"),
        whythisplace: String(place.whythisplace || "No description available"),
        todo: String(place.todo || "Explore the area"),
        image: String(place.image || "https://images.unsplash.com/photo-1502573144095-e48bf2184e29")
      };
      
      return cleanPlace;
    });
    
    return {
      plan: validatedPlan,
      message: String(response.message || "Tour plan created successfully.")
    };
  } catch (error) {
    console.error("Response validation error:", error);
    return defaultPlanResponse();
  }
}
function defaultPlanResponse(): TourPlanResponse {
  return {
    plan: [
      {
        place: "Eiffel Tower",
        costperperson: "$25",
        detailedaddress: "Champ de Mars, 5 Avenue Anatole France, 75007 Paris",
        latitude: "48.8584",
        longitude: "2.2945",
        whythisplace: "Iconic symbol of Paris with breathtaking views",
        todo: "Take photos, visit the observation deck, have a picnic in the park",
        image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f"
      }
    ],
    message: "I've created a basic Paris tour plan featuring the Eiffel Tower. You can ask me to create a more detailed plan for any specific location."
  };
}