"use server";

import { z } from "zod";
import { DB } from "@/lib/db";
import { sendLeadNotification } from "@/lib/email";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  company: z.string().min(1, "Company name is required"),
  message: z.string().optional(),
});

export async function submitContact(formData: FormData) {
  try {
    const name = formData.get("name") as string || "";
    const email = formData.get("email") as string || "";
    const company = formData.get("company") as string || "";
    const phone = formData.get("phone") as string || "";
    const service = formData.get("service") as string || "";
    const volume = formData.get("volume") as string || "";
    const message = formData.get("message") as string || "";

    // Validate core fields
    const validatedData = contactSchema.parse({ name, email, company, message });

    // Build a comprehensive message that includes all the form fields
    const fullMessage = [
      service ? `Service: ${service}` : "",
      volume ? `Volume: ${volume}` : "",
      phone ? `Phone: ${phone}` : "",
      message ? `\nMessage: ${message}` : "",
    ].filter(Boolean).join("\n");

    // Save to Database
    const dbPayload = {
      name: validatedData.name,
      email: validatedData.email,
      company: validatedData.company,
      message: fullMessage || "Corporate Inquiry (no additional details)",
    };
    
    const result = await DB.contactMessages.create(dbPayload);

    // Send email notification
    await sendLeadNotification(dbPayload);

    return { success: true, data: result };
  } catch (error: unknown) {
    console.error("Contact submission error:", error);
    if (error instanceof z.ZodError) {
      return { success: false, error: (error as any).errors?.[0]?.message || "Validation failed." };
    }
    return { success: false, error: error instanceof Error ? error.message : "An unexpected error occurred." };
  }
}
