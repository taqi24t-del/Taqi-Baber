
import { GoogleGenAI } from "@google/genai";
import { Service, Appointment } from "../types";

export class GeminiAssistant {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async generateResponse(
    userMessage: string,
    services: Service[],
    appointments: Appointment[],
    currentDate: string
  ) {
    const servicesContext = services.map(s => `- ${s.name}: ${s.description} (${s.price})`).join('\n');
    const bookingsContext = appointments
      .filter(a => a.date === currentDate)
      .map(a => `- ${a.time} is BOOKED for ${a.serviceName}`)
      .join('\n');

    const systemInstruction = `
      You are "BarberFlow Assistant", a premium barbershop concierge.
      Today's date is ${currentDate}.
      
      Our Services:
      ${servicesContext}

      Current Bookings for Today:
      ${bookingsContext || "No bookings yet today."}

      Your goal:
      1. Greet the customer politely.
      2. Recommend services based on their needs.
      3. Check availability for slots between 09:00 and 19:00 (every 30 mins).
      4. DO NOT book a slot that is already booked.
      5. If they want to book, tell them to use the "Calendar" tab or ask for their Name and Mobile Number to "tentatively" confirm.
      6. Keep responses elegant, brief, and professional.
      7. Use Currency Symbol (₹) if mentioned in service list.
    `;

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });
      return response.text || "I'm sorry, I'm having trouble connecting to the barber network. Please try again.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Something went wrong. Please check your settings or try again later.";
    }
  }
}
