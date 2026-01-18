import { z } from "zod";

const taggedSchema = z.object({
  id: z.number(),
  thumbnail_url: z.string().url(),
  caption: z.string().optional(),
});

const taggedSchemas = z.array(taggedSchema);

type Tagged = z.infer<typeof taggedSchema>;

export { taggedSchema, taggedSchemas };
export type { Tagged };
