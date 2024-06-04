import { z } from "zod";

export const materiaSchema = z.object({
    nome: z.string(),
    descricao: z.string(),
    professor_id: z.string(),
    conteudos: z.instanceof(File, { message: 'Coloque um conteúdo'})
        .refine((f) => f.size < 2000_000, 'Tamanho máximo de 2MB excedido')
        .array()
})