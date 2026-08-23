"use server";

import { z } from "zod";
import { DB } from "@/lib/db";
import { sendEprNotification } from "@/lib/email";

const eprSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  contactPerson: z.string().min(2, "Contact person is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Invalid phone number"),
  ewasteCategory: z.string().min(1, "E-waste category is required"),
  estimatedVolume: z.string().min(1, "Estimated volume is required"),
  message: z.string().optional(),
});

export async function submitEPRInquiry(formData: FormData) {
  try {
    const rawData = {
      companyName: formData.get("companyName") as string,
      contactPerson: formData.get("contactPerson") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      ewasteCategory: formData.get("ewasteCategory") as string,
      estimatedVolume: formData.get("estimatedVolume") as string,
      message: formData.get("message") as string,
    };

    // Validate using Zod
    const validatedData = eprSchema.parse(rawData);

    // Save to Database
    const dbPayload = {
      companyName: validatedData.companyName,
      contactPerson: validatedData.contactPerson,
      email: validatedData.email,
      phone: validatedData.phone,
      ewasteCategory: validatedData.ewasteCategory,
      estimatedVolume: validatedData.estimatedVolume,
      message: validatedData.message || "",
    };
    const result = await DB.eprInquiries.create(dbPayload);

    // Send email notification
    await sendEprNotification(dbPayload);

    return { success: true, data: result };
  } catch (error: unknown) {
    console.error("EPR submission error:", error);
    if (error instanceof z.ZodError) {
      return { success: false, error: (error as any).errors?.[0]?.message || "Validation failed." };
    }
    return { success: false, error: error instanceof Error ? error.message : "An unexpected error occurred. Please try again." };
  }
}
