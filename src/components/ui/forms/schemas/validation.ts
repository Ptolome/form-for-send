import { z } from "zod";

export const senderSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  phone: z
    .string()
    .regex(
      /^\+?[0-9]{10,15}$/,
      "Введите корректный номер телефона (10-15 цифр)",
    ),
  city: z.string().min(1, "Выберите город отправления"),
});

export const receiverSchema = z
  .object({
    name: z.string().min(1, "Имя получателя обязательно"),
    city: z.string().min(1, "Выберите город назначения"),
    cargoType: z.enum(["documents", "fragile", "regular"]),
    weight: z
      .number()
      .min(0.1, "Вес должен быть не менее 0.1 кг")
      .max(30, "Вес должен быть не более 30 кг"),
  })
  .refine(
    () => {
      return true;
    },
    {
      message: "Город назначения не может совпадать с городом отправления",
      path: ["city"],
    },
  );

export const orderFormSchema = z.object({
  sender: senderSchema,
  receiver: receiverSchema,
});
