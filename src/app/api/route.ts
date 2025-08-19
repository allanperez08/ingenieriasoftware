import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    const body = await request.json();

    if (body && body.titulo !== undefined && body.descripcion !== undefined && body.autor !== undefined) {
        console.log('Título: ', body.titulo);
        console.log('Descripción: ', body.descripcion);
        console.log('Autor: ', body.autor);

        if (typeof body.titulo === 'string' && typeof body.descripcion === 'string' && typeof body.autor === 'string') {

            const titulo = body.titulo.trim();
            if (!(titulo && titulo.length >= 5 && titulo.length <= 100)) {
                return NextResponse.json({
                    mensaje: 'El título no es válido. Debe tener entre 5 y 100 caracteres.',
                    valor: body.titulo
                }, { status: 400 });
            }
            console.log('Título válido:', titulo);

            const descripcion = body.descripcion.trim();
            if (descripcion.length < 10 || descripcion.length > 500) {
                return NextResponse.json({
                    mensaje: 'La descripción no es válida. Debe contener entre 10 y 500 caracteres.',
                    valor: body.descripcion
                }, { status: 400 });
            }
            console.log('Descripción válida:', descripcion);

            const autor = body.autor.trim();

            if (autor.length < 3 || autor.length > 50) {
                return NextResponse.json({
                    mensaje: 'El nombre del autor debe tener entre 3 y 50 caracteres.',
                    valor: body.autor
                }, { status: 400 });
            }

            if (autor.charAt(0) !== autor.charAt(0).toUpperCase()) {
                return NextResponse.json({
                    mensaje: 'El nombre del autor debe iniciar con mayúscula.',
                    valor: body.autor
                }, { status: 400 });
            }

            let caracteresValidos = "abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZáéíóúÁÉÍÓÚüÜ -'.";
            for (let letra of autor) {
                if (!caracteresValidos.includes(letra)) {
                    return NextResponse.json({
                        mensaje: `El autor contiene un carácter inválido: '${letra}'`,
                        valor: body.autor
                    }, { status: 400 });
                }
            }

            console.log('Autor válido:', autor);

        } else {
            return NextResponse.json({
                mensaje: 'Los datos no son del tipo correcto. Título, descripción y autor deben ser cadenas de texto.',
                tiposRecibidos: {
                    titulo: typeof body.titulo,
                    descripcion: typeof body.descripcion,
                    autor: typeof body.autor
                }
            }, { status: 400 });
        }

    } else {
        return NextResponse.json({
            mensaje: 'Faltan campos requeridos: titulo, descripcion, autor'
        }, { status: 400 });
    }

    return NextResponse.json({
        mensaje: 'Los datos son válidos',
        datos: body
    });
}
