// app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export const runtime = "nodejs"; // Needed for file uploads

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const taskId = formData.get("taskId") as string;
    const uploadType = formData.get("uploadType") as string; // "question", "description", "instruction"

    // Debug: log all formData keys and values
    for (const [key, value] of formData.entries()) {
      console.log(`[UPLOAD] formData: ${key} =`, value);
    }
    
    if (!file) {
      console.error("[UPLOAD] No file uploaded");
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Determine the upload directory based on type and task ID
    let uploadsDir: string;
    let publicUrl: string;
    
    if (uploadType === "question") {
      uploadsDir = join(process.cwd(), "public", "uploads", "task-questions");
      publicUrl = `/uploads/task-questions/`;
    } else {
      if (!taskId) {
        console.error("[UPLOAD] Task ID is required for description/instruction uploads");
        return NextResponse.json({ error: "Task ID is required for description/instruction uploads" }, { status: 400 });
      }
      uploadsDir = join(process.cwd(), "public", "uploads", "tasks", taskId, uploadType || "description");
      publicUrl = `/uploads/tasks/${taskId}/${uploadType || "description"}/`;
    }
    console.log(`[UPLOAD] uploadsDir: ${uploadsDir}`);
    
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const fileName = `${timestamp}_${sanitizedName}`;
    const filePath = join(uploadsDir, fileName);
    console.log(`[UPLOAD] filePath: ${filePath}`);

    // Convert file to buffer and save
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Write file to disk
    await writeFile(filePath, buffer);

    // Return the public URL
    const fullUrl = publicUrl + fileName;

    console.log(`File uploaded successfully: ${fullUrl}`);
    
    return NextResponse.json({ 
      url: fullUrl, 
      fileName,
      size: file.size,
      type: file.type,
      uploadType,
      taskId
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ 
      error: error?.message || String(error) || "Failed to upload file" 
    }, { status: 500 });
  }
}
