import { z } from "zod";

export const paymentFormSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre es requerido")
    .refine(
      (val) => {
        const words = val.trim().split(/\s+/);
        return (
          words.length >= 2 &&
          words.every((w) => /^[A-Z][a-zÀ-ÿ'\-]+$/.test(w))
        );
      },
      {
        message:
          "Debe ingresar al menos nombre y apellido, cada uno iniciando con mayúscula",
      }
    ),

  email: z
    .string()
    .email("Correo electrónico inválido"),

  password: z.string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(/[A-Z]/, 'Debe contener al menos una letra mayúscula')
    .regex(
      /^[A-Za-z0-9!@#$%^&*()\-_+=]*$/,
      'Solo se permiten letras, números y !@#$%^&*()-_+='
    ),  

  phone: z
    .string()
    .regex(/^\+?[0-9]{8,15}$/, "Número de teléfono inválido"),

  idNumber: z
    .string()
    .min(6, "Cédula inválida")
    .regex(/^\d+$/, "La cédula debe contener solo números"),

  city: z
    .string()
    .min(2, "Ciudad requerida"),

  state: z
    .string()
    .min(2, "Provincia requerida"),

  postalCode: z
    .string()
    .regex(/^\d{4,10}$/, "Código postal inválido"),

  country: z
    .string()
    .length(2, "Selecciona un país válido"),

  cardNumber: z
    .string()
    .regex(/^\d{13,19}$/, "Número de tarjeta inválido"),

  expMonth: z
    .string()
    .regex(/^(0?[1-9]|1[0-2])$/, "Mes inválido (01–12)"),

  expYear: z
    .string()
    .regex(/^\d{4}$/, "Año inválido (4 dígitos)"),

  cvv: z
    .string()
    .regex(/^\d{3,4}$/, "CVV inválido"),
});
