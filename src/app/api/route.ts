import { NextResponse, NextRequest } from 'next/server';
import { PostValidator } from '../utils/post-validator';
import { PostRegistrar } from '../utils/post-registrar';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        if (!body.titulo || !body.descripcion || !body.autor) {
            return NextResponse.json({
                mensaje: 'Faltan campos requeridos: titulo, descripcion, autor'
            }, { status: 400 });
        }

        const titulo = PostValidator.validateTitulo(body.titulo);
        const descripcion = PostValidator.validateDescripcion(body.descripcion);
        const autor = PostValidator.validateAutor(body.autor);

        const nuevoRegistro = await PostRegistrar.save(titulo, descripcion, autor);

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
