"use server";

import { z } from "zod";
import { DB } from "@/lib/db";
import { sendLeadNotification } from "@/lib/email";

const leadSchema = z.object({
  email: z.string().email("Invalid email address"),
  companyName: z.string().optional(),
  phone: z.string().optional(),
  name: z.string().optional(),
  service: z.string().optional(),
});

export async function submitLead(formData: FormData) {
  try {
    const rawData = {
      email: formData.get("email") as string || "",
      // Form uses 'company' key, action expects 'companyName'
      companyName: (formData.get("companyName") || formData.get("company")) as string || "",
      phone: formData.get("phone") as string || "",
      name: formData.get("name") as string || "",
      service: formData.get("service") as string || "",
    };

    // Validate using Zod
    const validatedData = leadSchema.parse(rawData);

    // Save to Database via abstraction layer
    const result = await DB.leads.create(validatedData);

    // Send email notification
    await sendLeadNotification(validatedData);

    return { success: true, data: result };
  } catch (error: unknown) {
    console.error("Lead submission error:", error);
    if (error instanceof z.ZodError) {
      const firstError = (error as any).errors?.[0]?.message;
      return { success: false, error: firstError || "Validation failed." };
    }
    return { success: false, error: error instanceof Error ? error.message : "An unexpected error occurred." };
  }
}
