import postgres from 'postgres';
import { NextResponse, NextRequest } from 'next/server';

const sql = postgres('postgresql://postgres.cnlxffxyxsgxtdumfbtp:Allan200408@aws-1-us-east-2.pooler.supabase.com:6543/postgres');

function validateTitulo(titulo: any) {
    if (typeof titulo !== 'string') {
        throw new Error('El título debe ser una cadena de texto.');
    }
    const value = titulo.trim();
    if (!(value && value.length >= 5 && value.length <= 100)) {
        throw new Error('El título no es válido. Debe tener entre 5 y 100 caracteres.');
    }
    return value;
}

function validateDescripcion(descripcion: any) {
    if (typeof descripcion !== 'string') {
        throw new Error('La descripción debe ser una cadena de texto.');
    }
    const value = descripcion.trim();
    if (value.length < 10 || value.length > 500) {
        throw new Error('La descripción no es válida. Debe contener entre 10 y 500 caracteres.');
    }
    return value;
}

function validateAutor(autor: any) {
    if (typeof autor !== 'string') {
        throw new Error('El autor debe ser una cadena de texto.');
    }
    const value = autor.trim();

    if (value.length < 3 || value.length > 50) {
        throw new Error('El nombre del autor debe tener entre 3 y 50 caracteres.');
    }
    if (value.charAt(0) !== value.charAt(0).toUpperCase()) {
        throw new Error('El nombre del autor debe iniciar con mayúscula.');
    }

    let caracteresValidos = "abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZáéíóúÁÉÍÓÚüÜ -'.";
    for (let letra of value) {
        if (!caracteresValidos.includes(letra)) {
            throw new Error(`El autor contiene un carácter inválido: '${letra}'`);
        }
    }

    return value;
}

async function saveToDatabase(titulo: string, descripcion: string, autor: string) {
    const result = await sql`
        INSERT INTO "Posts" (titulo, descripcion, autor)
        VALUES (${titulo}, ${descripcion}, ${autor})
        RETURNING id, titulo, descripcion, autor;
    `;
    return result[0];
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        if (!body.titulo || !body.descripcion || !body.autor) {
            return NextResponse.json({
                mensaje: 'Faltan campos requeridos: titulo, descripcion, autor'
            }, { status: 400 });
        }

        const titulo = validateTitulo(body.titulo);
        const descripcion = validateDescripcion(body.descripcion);
        const autor = validateAutor(body.autor);

        const nuevoRegistro = await saveToDatabase(titulo, descripcion, autor);

        return NextResponse.json({
            mensaje: 'Datos válidos e insertados correctamente',
            datos: nuevoRegistro
        });

    } catch (error: any) {
        console.error('Error en POST:', error);
        return NextResponse.json({
            mensaje: error.message || 'Error inesperado'
        }, { status: 400 });
    }
}
