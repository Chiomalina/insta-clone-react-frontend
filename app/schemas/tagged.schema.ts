import { z } from "zod"

export const taggerSchema = z.object({
  id: z.number(),
  username: z.string(),
  avatar_url: z.string().url().nullable().optional(),
})

export const taggedPostSchema = z.object({
  id: z.number(),
  img_url: z.string().url(),
  caption: z.string().nullable(),
  created_at: z.string(),
  tagged_by: taggerSchema,
})

export const taggedGridSchema = z.array(taggedPostSchema)

export type TaggedPost = z.infer<typeof taggedPostSchema>
export type TaggedGrid = z.infer<typeof taggedGridSchema>
