import nodemailer from "nodemailer";
import { 
  PickupRequestData, 
  LeadData, 
  ContactMessageData, 
  EprInquiryData, 
  JobApplicationData 
} from "./db";

// Use environment variables for SMTP configuration, defaulting to GoDaddy settings if not fully provided.
// It is heavily recommended to supply SMTP_USER and SMTP_PASS in .env.local
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtpout.secureserver.net",
  port: parseInt(process.env.SMTP_PORT || "465"),
  secure: process.env.SMTP_PORT === "465" || !process.env.SMTP_PORT, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const TO_EMAIL = "contact@arkaarya.com";
const FROM_EMAIL = process.env.SMTP_USER || TO_EMAIL;

/**
 * Sends a general email utilizing the transporter.
 * If userEmail is provided, sends a confirmation copy to the user.
 */
async function sendMail(subject: string, adminHtml: string, userEmail?: string, customUserHtml?: string) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn("Email not sent: SMTP_USER and SMTP_PASS are not configured in environment variables.");
    return;
  }
  
  try {
    // Send to Admin
    await transporter.sendMail({
      from: `"ArkaArya Portal" <${FROM_EMAIL}>`,
      to: TO_EMAIL,
      subject,
      html: adminHtml,
    });
    console.log(`Email notification sent to Admin: ${subject}`);

    // Send confirmation to User
    if (userEmail && customUserHtml) {
      await transporter.sendMail({
        from: `"ArkaArya" <${FROM_EMAIL}>`,
        to: userEmail,
        subject: `Confirmation: ${subject}`,
        html: customUserHtml,
      });
      console.log(`Confirmation email sent to User (${userEmail})`);
    }
  } catch (error) {
    console.error("Failed to send email notification:", error);
  }
}

/**
 * Send notification for a new Scheduled Pickup Request
 */
export async function sendPickupNotification(data: PickupRequestData) {
  const subject = `New Pickup Request: ${data.pickupId}`;
  
  const categoriesList = data.categories.join(", ");
  const photosList = (data.photos || []).map((url, i) => `<a href="${url}">Photo ${i + 1}</a>`).join(" | ");

  const adminHtml = `
    <h2>New E-Waste Pickup Request</h2>
    <p>A new pickup request has been submitted. Details are as follows:</p>
    <table border="1" cellpadding="8" style="border-collapse: collapse; width: 100%; max-width: 800px;">
      <tr><th align="left" width="30%">Pickup ID</th><td>${data.pickupId}</td></tr>
      <tr><th align="left">Name</th><td>${data.name}</td></tr>
      <tr><th align="left">Company</th><td>${data.company || "N/A"}</td></tr>
      <tr><th align="left">Phone</th><td>${data.phone}</td></tr>
      <tr><th align="left">Email</th><td>${data.email || "N/A"}</td></tr>
      <tr><th align="left">Pickup Type</th><td>${data.pickupType}</td></tr>
      <tr><th align="left">Address</th><td>${data.address}<br>${data.city}, ${data.state} - ${data.pincode}</td></tr>
      ${data.coordinates ? `<tr><th align="left">Coordinates</th><td>${data.coordinates}</td></tr>` : ""}
      <tr><th align="left">Preferred Date/Time</th><td>${data.date} at ${data.time} (${data.urgency})</td></tr>
      <tr><th align="left">Condition</th><td>${data.condition}</td></tr>
      <tr><th align="left">Categories</th><td>${categoriesList}</td></tr>
      <tr><th align="left">Quantity</th><td>${data.quantity}</td></tr>
      <tr><th align="left">No. of Items</th><td>${data.items || "N/A"}</td></tr>
      <tr><th align="left">Customer Needs</th><td>${data.need}</td></tr>
      <tr><th align="left">Data Destruction</th><td>${data.dataDestruction || "N/A"}</td></tr>
      <tr><th align="left">Notes</th><td>${data.notes || "None"}</td></tr>
      ${photosList ? `<tr><th align="left">Photos</th><td>${photosList}</td></tr>` : ""}
    </table>
    <p><a href="https://arkaarya.com/admin/pickups/${data.pickupId}">View in Admin Portal</a></p>
  `;

  const userHtml = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; line-height: 1.6; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
      <div style="background-color: #0b4cb4; color: white; padding: 24px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">Arka Arya</h1>
        <p style="margin: 8px 0 0 0; opacity: 0.9;">E-Waste Management</p>
      </div>
      
      <div style="padding: 32px 24px;">
        <h2 style="color: #0f172a; margin-top: 0;">Hi ${data.name.split(' ')[0]},</h2>
        <p>Thank you for scheduling an e-waste pickup with Arka Arya! We have successfully received your request. Our team will review the details and be in touch with you shortly to confirm the logistics.</p>
        
        <div style="background-color: #f8fafc; border-radius: 8px; padding: 20px; margin: 24px 0; border: 1px solid #e2e8f0;">
          <h3 style="margin-top: 0; color: #334155; font-size: 16px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">Pickup Summary</h3>
          <p style="margin: 8px 0;"><strong>Pickup ID:</strong> ${data.pickupId}</p>
          <p style="margin: 8px 0;"><strong>Preferred Time:</strong> ${data.date} at ${data.time}</p>
          <p style="margin: 8px 0;"><strong>Address:</strong> ${data.address}, ${data.city}</p>
          <p style="margin: 8px 0;"><strong>Category:</strong> ${categoriesList}</p>
          <p style="margin: 8px 0;"><strong>Quantity:</strong> ${data.quantity}</p>
        </div>

        <p>If you have any questions or need to make changes, please reply directly to this email or contact us at <a href="mailto:contact@arkaarya.com" style="color: #0b4cb4;">contact@arkaarya.com</a>.</p>
        
        <p style="margin-bottom: 0;">Best regards,<br><strong>The Arka Arya Team</strong></p>
      </div>
      
      <div style="background-color: #f1f5f9; padding: 16px; text-align: center; font-size: 12px; color: #64748b;">
        <p style="margin: 0;">&copy; ${new Date().getFullYear()} Arka Arya. All rights reserved.</p>
      </div>
    </div>
  `;

  await sendMail(subject, adminHtml, data.email, userHtml);
}

/**
 * Send notification for a new Lead/Inquiry (from SubmitLead or SubmitContact)
 */
export async function sendLeadNotification(data: LeadData | ContactMessageData) {
  const isContact = "message" in data;
  const name = isContact ? (data as ContactMessageData).name : "New Lead";
  const company = "company" in data ? data.company : ("companyName" in data ? data.companyName : "N/A");
  
  const subject = `New Inquiry/Lead: ${company || name}`;

  const adminHtml = `
    <h2>New Inquiry / Lead Submitted</h2>
    <table border="1" cellpadding="8" style="border-collapse: collapse; width: 100%; max-width: 600px;">
      <tr><th align="left" width="30%">Name</th><td>${name}</td></tr>
      <tr><th align="left">Email</th><td>${data.email}</td></tr>
      <tr><th align="left">Company</th><td>${company || "N/A"}</td></tr>
      ${"phone" in data && data.phone ? `<tr><th align="left">Phone</th><td>${data.phone}</td></tr>` : ""}
      ${isContact ? `<tr><th align="left">Message</th><td><pre style="white-space: pre-wrap; font-family: inherit;">${(data as ContactMessageData).message}</pre></td></tr>` : ""}
    </table>
  `;

  const userHtml = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; line-height: 1.6; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
      <div style="background-color: #0b4cb4; color: white; padding: 24px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">Arka Arya</h1>
      </div>
      <div style="padding: 32px 24px;">
        <h2 style="color: #0f172a; margin-top: 0;">Hi ${name.split(' ')[0]},</h2>
        <p>Thank you for contacting Arka Arya! We have received your inquiry and our team will get back to you as soon as possible.</p>
        <p>We appreciate your interest in our e-waste management services.</p>
        <p style="margin-bottom: 0;">Best regards,<br><strong>The Arka Arya Team</strong></p>
      </div>
    </div>
  `;

  await sendMail(subject, adminHtml, data.email, userHtml);
}

/**
 * Send notification for a new EPR Service Request
 */
export async function sendEprNotification(data: EprInquiryData) {
  const subject = `New EPR Service Request: ${data.companyName}`;

  const adminHtml = `
    <h2>New EPR Service Request</h2>
    <table border="1" cellpadding="8" style="border-collapse: collapse; width: 100%; max-width: 600px;">
      <tr><th align="left" width="30%">Company Name</th><td>${data.companyName}</td></tr>
      <tr><th align="left">Contact Person</th><td>${data.contactPerson}</td></tr>
      <tr><th align="left">Email</th><td>${data.email}</td></tr>
      <tr><th align="left">Phone</th><td>${data.phone}</td></tr>
      <tr><th align="left">E-Waste Category</th><td>${data.ewasteCategory}</td></tr>
      <tr><th align="left">Estimated Volume</th><td>${data.estimatedVolume}</td></tr>
      <tr><th align="left">Message</th><td><pre style="white-space: pre-wrap; font-family: inherit;">${data.message}</pre></td></tr>
    </table>
  `;

  const userHtml = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; line-height: 1.6; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
      <div style="background-color: #0b4cb4; color: white; padding: 24px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">Arka Arya</h1>
        <p style="margin: 8px 0 0 0; opacity: 0.9;">EPR Services</p>
      </div>
      <div style="padding: 32px 24px;">
        <h2 style="color: #0f172a; margin-top: 0;">Hi ${data.contactPerson.split(' ')[0]},</h2>
        <p>Thank you for submitting an EPR Service request for <strong>${data.companyName}</strong>.</p>
        <p>Our compliance experts are reviewing your request and will contact you shortly to discuss your e-waste volume and category requirements.</p>
        <p style="margin-bottom: 0;">Best regards,<br><strong>The Arka Arya Team</strong></p>
      </div>
    </div>
  `;

  await sendMail(subject, adminHtml, data.email, userHtml);
}

/**
 * Send notification for a new Job Application
 */
export async function sendJobNotification(data: JobApplicationData) {
  const subject = `New Job Application: ${data.name}`;

  const adminHtml = `
    <h2>New Job Application Received</h2>
    <table border="1" cellpadding="8" style="border-collapse: collapse; width: 100%; max-width: 600px;">
      <tr><th align="left" width="30%">Name</th><td>${data.name}</td></tr>
      <tr><th align="left">Email</th><td>${data.email}</td></tr>
      <tr><th align="left">Phone</th><td>${data.phone}</td></tr>
      ${data.jobId ? `<tr><th align="left">Job ID</th><td>${data.jobId}</td></tr>` : ""}
      <tr><th align="left">Area of Interest</th><td>${data.interest || "N/A"}</td></tr>
      <tr><th align="left">Message / Cover Letter</th><td><pre style="white-space: pre-wrap; font-family: inherit;">${data.message || "N/A"}</pre></td></tr>
      ${data.resumeUrl ? `<tr><th align="left">Resume</th><td><a href="${data.resumeUrl}">View Resume</a></td></tr>` : ""}
    </table>
  `;

  const userHtml = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; line-height: 1.6; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
      <div style="background-color: #0b4cb4; color: white; padding: 24px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">Arka Arya</h1>
        <p style="margin: 8px 0 0 0; opacity: 0.9;">Careers</p>
      </div>
      <div style="padding: 32px 24px;">
        <h2 style="color: #0f172a; margin-top: 0;">Hi ${data.name.split(' ')[0]},</h2>
        <p>Thank you for applying to join the Arka Arya team!</p>
        <p>We have successfully received your application and resume. Our hiring team will review your qualifications and reach out if there is a good match for our current openings.</p>
        <p style="margin-bottom: 0;">Best regards,<br><strong>The Arka Arya Talent Team</strong></p>
      </div>
    </div>
  `;

  await sendMail(subject, adminHtml, data.email, userHtml);
}
