import { useLoaderData, type LoaderFunctionArgs } from "react-router"
import { api } from "~/services/api"
import { highlightSchema, type Highlight } from "~/schemas/highlight.schema"
import { HighlightStory } from "~/components/HighlightStory"

export async function loader({ params }: LoaderFunctionArgs) {
  // The `params` object contains the dynamic parts of the URL.
  // The key (`id`) matches the filename (`$id.tsx`).
  const highlightId = params.id

  // 400 invalid id (missing or not a number)
  if (!highlightId || Number.isNaN(Number(highlightId))) {
    throw new Response("Invalid highlight ID", { status: 400 })
  }

  try {
    const response = await api.get(`/highlights/${highlightId}`)
    return highlightSchema.parse(response.data)
  } catch (error: any) {
    // Preserve true 404s from backend
    if (error?.response?.status === 404) {
      throw new Response("Highlight not found", { status: 404 })
    }

    // Everything else is a server/network problem
    throw new Response("Could not load highlight", { status: 500 })
  }
}

export default function HighlightDetail() {
  const highlight = useLoaderData() as Highlight

  return (
    <div>
      <h1 className="text-lg font-semibold p-4">
        {highlight.title ?? "Highlight"}
      </h1>

      <HighlightStory highlight={highlight} />
    </div>
  )
}
