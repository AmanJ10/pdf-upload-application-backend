import prisma from "../config/prisma.js";
import path from "path";
import fs from "fs";

export async function uploadDocument(req, res, next) {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No file uploaded" });

    const relativePath = path.join("uploads", file.filename);

    const doc = await prisma.document.create({
      data: {
        filename: file.filename,
        originalName: file.originalname,
        filePath: relativePath,
        mimeType: file.mimetype,
        fileSize: file.size,
      },
    });

    res.status(201).json({ message: "Uploaded", document: doc });
  } catch (err) {
    next(err);
  }
}

export async function listDocuments(req, res, next) {
  try {
    const docs = await prisma.document.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(docs);
  } catch (err) {
    next(err);
  }
}

export async function downloadDocument(req, res, next) {
  try {
    const id = Number(req.params.id);
    const doc = await prisma.document.findUnique({ where: { id } });
    if (!doc) return res.status(404).json({ error: "Not found" });

    const absPath = path.join(process.cwd(), doc.filePath);
    if (!fs.existsSync(absPath))
      return res.status(410).json({ error: "File missing" });

    res.download(absPath, doc.originalName);
  } catch (err) {
    next(err);
  }
}

export async function deleteDocument(req, res, next) {
  try {
    const id = Number(req.params.id);
    const doc = await prisma.document.findUnique({ where: { id } });
    if (!doc) return res.status(404).json({ error: "Not found" });

    const absPath = path.join(process.cwd(), doc.filePath);
    if (fs.existsSync(absPath)) {
      fs.unlinkSync(absPath);
    }

    await prisma.document.delete({ where: { id } });
    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
}
