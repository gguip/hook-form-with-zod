"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  expire_at: z.coerce.date().refine((date) => date > new Date(), {
    message: "Data inválida!",
  }),
  birthday: z.coerce.date().min(new Date("1900-01-01"), {
    message: "Tem certeza ?",
  }),
  finalDate: z.coerce.date().max(new Date(), {
    message: "Muito jovem...",
  }),
});

type FormData = z.infer<typeof schema>;

export default function ZodDate() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onBlur",
    resolver: zodResolver(schema),
  });

  console.log("🚀 ~ file: page.tsx:17 ~ ZodDate ~ errors:", errors);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "2rem",
      }}
    >
      <h1>ZodDate</h1>

      <form
        onSubmit={handleSubmit((data) => console.log(data))}
        style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}
      >
        <input type="date" {...register("expire_at")} />
        {errors.expire_at && <p>{errors.expire_at.message}</p>}

        <div>Birthday</div>

        <input type="date" {...register("birthday")} />
        {errors.birthday && <p>{errors.birthday.message}</p>}

        <div>Final Date</div>

        <input type="date" {...register("finalDate")} />
        {errors.finalDate && <p>{errors.finalDate.message}</p>}

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
