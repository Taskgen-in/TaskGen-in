// app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { authorizeB2 } from "@/lib/backblaze";

export const runtime = "nodejs"; // Needed for file uploads

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) {
      console.log("No file uploaded.");
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }
      console.log("File received:", file.name, file.size, file.type);

    // Authorize B2 (your helper function)
    const b2 = await authorizeB2();

    // Prepare the file data
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileName = `${Date.now()}_${file.name.replace(/\s/g, "_")}`;

    // Get the upload URL and auth token
    const uploadUrlResp = await b2.getUploadUrl({
      bucketId: process.env.B2_BUCKET_ID!,
    });
    const uploadUrl = uploadUrlResp.data.uploadUrl;
    const uploadAuthToken = uploadUrlResp.data.authorizationToken;

    // Upload file to Backblaze B2
    await b2.uploadFile({
      uploadUrl,
      uploadAuthToken,
      fileName,
      data: buffer,
      contentType: file.type || "application/octet-stream",
    });

    // Construct the file's public URL
    const fileUrl = `https://f004.backblazeb2.com/file/${process.env.B2_BUCKET_NAME}/${fileName}`;

    return NextResponse.json({ url: fileUrl, fileName });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
