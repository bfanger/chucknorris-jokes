import * as valibot from "valibot";

export type Joke = valibot.InferOutput<typeof jokeSchema>;
export const jokeSchema = valibot.object({
  id: valibot.string(),
  value: valibot.string(),
});
