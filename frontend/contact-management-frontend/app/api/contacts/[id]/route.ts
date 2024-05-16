import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../utils/dbConnect";
import Contact from "../../../../models/contact";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const data = await request.json();
  const contact = await Contact.findByIdAndUpdate(params.id, data, {
    new: true,
    runValidators: true,
  });
  if (!contact) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
  return NextResponse.json({ success: true, data: contact });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const contact = await Contact.findByIdAndDelete(params.id);
  if (!contact) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
  return NextResponse.json({ success: true, data: {} });
}
