import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  const { contacts } = await request.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Use environment variables for security
      pass: process.env.EMAIL_PASS, // Use environment variables for security
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "info@redpositive.in",
    subject: "Selected Contacts Information",
    text: JSON.stringify(contacts, null, 2),
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.toString() },
      { status: 500 }
    );
  }
}
