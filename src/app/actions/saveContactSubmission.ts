// src/app/actions/saveContactSubmission.ts
'use server';

import { z } from 'zod';
import { db } from '@/lib/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const contactFormSchema = z.object({
  name: z.string().min(1, { message: "El nombre es requerido." }),
  email: z.string().email({ message: "Por favor, ingresa un email válido." }),
  company: z.string().optional(),
  message: z.string().min(1, { message: "El mensaje es requerido." }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export async function saveContactSubmission(
  data: ContactFormData
): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    // Validar los datos con Zod por si acaso, aunque el frontend ya lo hace
    const validatedData = contactFormSchema.parse(data);

    const docRef = await addDoc(collection(db, "contactSubmissions"), {
      ...validatedData,
      submittedAt: Timestamp.now(), // Marca de tiempo del servidor
    });

    console.log("Contact submission saved with ID: ", docRef.id);
    return { success: true, message: "¡Tu solicitud ha sido enviada con éxito! Nos pondremos en contacto pronto." };
  } catch (error) {
    console.error("Error adding contact submission to Firestore: ", error);
    if (error instanceof z.ZodError) {
      return { success: false, error: "Datos del formulario inválidos.", message: error.errors.map(e => e.message).join(', ') };
    }
    return { success: false, error: "No se pudo enviar el mensaje. Por favor, inténtalo de nuevo más tarde.", message: "Ocurrió un error inesperado." };
  }
}
