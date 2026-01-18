import { z } from "zod"

export const highlightSchema = z.object({
  id: z.number(),
  cover_image_url: z.string().url(),
  title: z.string().nullable(),
})

export const highlightsListSchema = z.array(highlightSchema)

export type Highlight = z.infer<typeof highlightSchema>
export type HighlightsList = z.infer<typeof highlightsListSchema>
