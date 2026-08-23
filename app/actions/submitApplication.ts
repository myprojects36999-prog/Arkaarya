"use server";

import { z } from "zod";
import { DB } from "@/lib/db";
import { sendJobNotification } from "@/lib/email";

const applicationSchema = z.object({
  jobId: z.string().optional(),
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  interest: z.string().optional(),
  message: z.string().optional(),
});

export async function submitApplication(formData: FormData) {
  try {
    const rawData = {
      jobId: formData.get("jobId")?.toString() || undefined,
      name: formData.get("name")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      phone: formData.get("phone")?.toString() || "",
      interest: formData.get("interest")?.toString() || undefined,
      message: formData.get("message")?.toString() || undefined,
    };

    const validatedData = applicationSchema.parse(rawData);
    const resumeFile = formData.get("resume") as File;
    let resumeUrl = "";

    if (resumeFile && resumeFile.size > 0) {
      if (resumeFile.size > 5 * 1024 * 1024) {
        return { success: false, error: "Resume file must be less than 5MB." };
      }
      if (resumeFile.type !== "application/pdf") {
        return { success: false, error: "Only PDF resumes are accepted." };
      }

      const url = await DB.storage.uploadResume(resumeFile, validatedData.email);
      if (url) {
        resumeUrl = url;
      } else {
        return { success: false, error: "Failed to upload resume file. Please try again." };
      }
    }

    const applicationData = {
      ...validatedData,
      resumeUrl: resumeUrl || undefined,
    };

    await DB.jobApplications.create(applicationData);

    // Send email notification
    await sendJobNotification(applicationData);

    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: (error as any).errors?.[0]?.message || "Validation failed." };
    }
    console.error("Submit application error:", error);
    return { success: false, error: "Failed to submit application. Please try again." };
  }
}
