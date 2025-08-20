// src/utils/post-validator.ts
export class PostValidator {
    static validateTitulo(titulo: any): string {
        if (typeof titulo !== 'string') throw new Error('El título debe ser una cadena de texto.');
        const value = titulo.trim();
        if (!(value && value.length >= 5 && value.length <= 100)) {
            throw new Error('El título no es válido. Debe tener entre 5 y 100 caracteres.');
        }
        return value;
    }

    static validateDescripcion(descripcion: any): string {
        if (typeof descripcion !== 'string') throw new Error('La descripción debe ser una cadena de texto.');
        const value = descripcion.trim();
        if (value.length < 10 || value.length > 500) {
            throw new Error('La descripción no es válida. Debe contener entre 10 y 500 caracteres.');
        }
        return value;
    }

    static validateAutor(autor: any): string {
        if (typeof autor !== 'string') throw new Error('El autor debe ser una cadena de texto.');
        const value = autor.trim();
        if (value.length < 3 || value.length > 50) {
            throw new Error('El nombre del autor debe tener entre 3 y 50 caracteres.');
        }
        if (value.charAt(0) !== value.charAt(0).toUpperCase()) {
            throw new Error('El nombre del autor debe iniciar con mayúscula.');
        }
        const caracteresValidos = "abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZáéíóúÁÉÍÓÚüÜ -'.";
        for (let letra of value) {
            if (!caracteresValidos.includes(letra)) {
                throw new Error(`El autor contiene un carácter inválido: '${letra}'`);
            }
        }
        return value;
    }
}

