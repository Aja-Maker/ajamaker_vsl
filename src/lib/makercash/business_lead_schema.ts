import { z } from 'zod';

export const businessLeadSchema = z.object({
  firstName: z.string().min(1, 'El nombre es obligatorio'),
  lastName: z.string().min(1, 'El apellido es obligatorio'),
  email: z.string().email('Correo inválido'),
  phone: z.string().min(8, 'Número inválido'),
  businessName: z.string().min(1, 'El nombre del negocio es obligatorio'),
  session: z.string().min(1, 'Debes seleccionar una sesión'),
});

export type BusinessLead = z.infer<typeof businessLeadSchema>;