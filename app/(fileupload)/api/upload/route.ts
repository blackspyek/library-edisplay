import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { writeFile } from "fs/promises";

export async function POST(req: NextRequest) {
    const data = await req.formData();
    const file = data.get("file");
    const type = data.get("type") ? String(data.get("type")) : "default";

    if (!file || !(file instanceof File)) {
        return NextResponse.json({ error: "No valid file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadDir = path.join(process.cwd(), "public/uploads", type);

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadDir, fileName);

    await writeFile(filePath, buffer);

    return NextResponse.json({ filePath: `/uploads/${fileName}` });
}
