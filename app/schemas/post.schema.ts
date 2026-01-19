import { z } from "zod";

// First, we declare a zod schema
const postSchema = z.object({
  id: z.number(),
  img_url: z.string().url(),
  caption: z.string().nullable(),
  created_at: z.string(),
});

const postsSchema = z.array(postSchema);

// Then, we infer the TypeScript type from Zod schema.
type Post = z.infer<typeof postSchema>;

export { postSchema, postsSchema };
export type { Post }

// Schema for creating a new post /for frontend validation)
export const createPostInputSchema = z.object({
  caption: z.string().min(1, "Captions is required.").max(255).optional(),
  image: z.instanceof(File).optional(), // For file input
})
  .refine((data) => data.caption || data.image, {
    message: "Either an image or a caption is required.",
    path: ["image"], // Path to the error message(Attache error to image field if both are missing )
  });

export type CreatePostInput = z.infer<typeof createPostInputSchema>;
