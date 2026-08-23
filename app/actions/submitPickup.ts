"use server";

import { z } from "zod";
import { DB } from "@/lib/db";
import { sendPickupNotification } from "@/lib/email";

const pickupSchema = z.object({
  pickupId: z.string(),
  pickupType: z.string().min(1, "Pickup type is required"),
  condition: z.string().min(1, "Condition is required"),
  categories: z.array(z.string()).min(1, "Select at least one category"),
  quantity: z.string().min(1, "Quantity is required"),
  items: z.string().optional(),
  address: z.string().min(2, "Address must be at least 2 characters"),
  state: z.string().min(2, "State is required"),
  city: z.string().min(2, "City is required"),
  pincode: z.string().length(6, "Pincode must be 6 digits"),
  coordinates: z.string().optional(),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  urgency: z.string().min(1, "Urgency is required"),
  need: z.string().min(1, "Selection is required"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  company: z.string().optional(),
  phone: z.string().min(10, "Invalid phone number"),
  email: z.string().optional(),
  dataDestruction: z.string().optional(),
  notes: z.string().optional(),
});

export async function submitPickupRequest(formData: FormData) {
  try {
    const rawData = {
      pickupId: formData.get("pickupId") as string,
      pickupType: formData.get("pickupType") as string,
      condition: formData.get("condition") as string,
      categories: formData.getAll("categories") as string[],
      quantity: formData.get("quantity") as string,
      items: formData.get("items") as string,
      address: formData.get("address") as string,
      state: formData.get("state") as string,
      city: formData.get("city") as string,
      pincode: formData.get("pincode") as string,
      coordinates: formData.get("coordinates") as string,
      date: formData.get("date") as string,
      time: formData.get("time") as string,
      urgency: formData.get("urgency") as string,
      need: formData.get("need") as string,
      name: formData.get("name") as string,
      company: formData.get("company") as string,
      phone: formData.get("phone") as string,
      email: formData.get("email") as string,
      dataDestruction: formData.get("dataDestruction") as string,
      notes: formData.get("notes") as string,
    };

    // Validate using Zod
    const validatedData = pickupSchema.parse(rawData);

    // Handle Photos Upload (if any)
    const photoFiles = formData.getAll("photos") as File[];
    const uploadedPhotoUrls: string[] = [];

    if (photoFiles && photoFiles.length > 0) {
      for (let i = 0; i < photoFiles.length; i++) {
        const file = photoFiles[i];
        if (file.size > 0) {
          const url = await DB.storage.uploadPickupPhoto(file, validatedData.pickupId, i);
          if (url) uploadedPhotoUrls.push(url);
        }
      }
    }

    // Save to Database via abstraction layer
    const dbPayload = {
      ...validatedData,
      photos: uploadedPhotoUrls.length > 0 ? uploadedPhotoUrls : undefined
    };
    
    const result = await DB.pickupRequests.create(dbPayload);

    // Send email notification
    await sendPickupNotification(dbPayload as any);

    return { success: true, data: result };
  } catch (error: unknown) {
    console.error("Pickup submission error:", error);
    if (error instanceof z.ZodError) {
      return { success: false, error: (error as any).errors?.[0]?.message || "Validation failed." };
    }
    return { success: false, error: error instanceof Error ? error.message : "An unexpected error occurred. Please try again." };
  }
}
