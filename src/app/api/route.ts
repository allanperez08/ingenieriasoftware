import { NextResponse, NextRequest } from 'next/server';

function validateTitle(title: unknown): string | null {
  if (typeof title !== "string") return "El título debe ser un texto.";
  const trimmed = title.trim();
  if (trimmed.length < 5 || trimmed.length > 100) return "El título debe tener entre 5 y 100 caracteres.";
  return null;
}

function validateDescription(description: unknown): string | null {
  if (typeof description !== "string") return "La descripción debe ser un texto.";
  const trimmed = description.trim();
  if (trimmed.length < 10 || trimmed.length > 500) return "La descripción debe tener entre 10 y 500 caracteres.";
  return null;
}

function validateAuthor(author: unknown): string | null {
  if (typeof author !== "string") return "El autor debe ser un texto.";

  const trimmed = author.trim();

  if (trimmed.length < 3 || trimmed.length > 50) {
    return "El autor debe tener entre 3 y 50 caracteres.";
  }

  if (trimmed[0] !== trimmed[0].toUpperCase()) {
    return "El nombre del autor debe iniciar con mayúscula.";
  }

  for (const char of trimmed) {
    if (!"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZáéíóúÁÉÍÓÚñÑüÜ -'.".includes(char)) {
      return `El autor contiene un carácter no válido: '${char}'`;
    }
  }

  return null;
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const errors: Record<string, string> = {};

    const titleError = validateTitle(data.title);
    if (titleError) errors.title = titleError;

    const descriptionError = validateDescription(data.description);
    if (descriptionError) errors.description = descriptionError;

    const authorError = validateAuthor(data.author);
    if (authorError) errors.author = authorError;

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ message: "Errores de validación", errors }, { status: 400 });
    }

    return NextResponse.json({
      message: "Datos válidos",
      data
    });

  } catch (error) {
    return NextResponse.json({ message: "Error al procesar la solicitud", error: String(error) }, { status: 500 });
  }
}
