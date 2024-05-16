import { NextResponse } from "next/server";
import dbConnect from "../../../utils/dbConnect";
import Contact from "../../../models/contact";

export async function GET() {
  await dbConnect();
  const contacts = await Contact.find({});
  return NextResponse.json({ success: true, data: contacts });
}

export async function POST(request: Request) {
  await dbConnect();
  const data = await request.json();
  const contact = await Contact.create(data);
  return NextResponse.json({ success: true, data: contact });
}
