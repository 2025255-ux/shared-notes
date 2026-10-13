import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const SECRET_FOOD = "ヤモリ";
const SECRET_COLOR = "虹色";

export const submitAnswer = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    z.object({ food: z.string().trim().min(1).max(100), color: z.string().trim().min(1).max(100) }).parse(d),
  )
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    if (data.food === SECRET_FOOD && data.color === SECRET_COLOR) {
      const { data: rows, error } = await supabaseAdmin
        .from("answers")
        .select("food, color")
        .order("created_at", { ascending: true });
      if (error) throw new Error(error.message);
      return { admin: true as const, rows: rows ?? [] };
    }
    const { error } = await supabaseAdmin.from("answers").insert({ food: data.food, color: data.color });
    if (error) throw new Error(error.message);
    return { admin: false as const, rows: [] };
  });
