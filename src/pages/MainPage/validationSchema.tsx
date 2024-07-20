import { z } from 'zod';

export const schema = z.object({
  csvFile: z
    .instanceof(File)
    .refine(file => file.type === "text/csv", "El archivo debe ser un CSV")
});

export type FormData = z.infer<typeof schema>;
