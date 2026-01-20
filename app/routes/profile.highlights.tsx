import {
  useLoaderData,
  useNavigation,
  useRouteError,
  isRouteErrorResponse,
} from "react-router"
import { api } from "~/services/api"
import {
  highlightsListSchema,
  type Highlight,
} from "~/schemas/highlight.schema"
import { HighlightBubble } from "~/components/HighlightBubble"

export async function loader() {
  try {
    const response = await api.get("/highlights")
    return highlightsListSchema.parse(response.data)
  } catch {
    throw new Response("Could not load highlights", { status: 404 })
  }
}

export default function ProfileHighlightsRoute() {
  const highlights = useLoaderData() as Highlight[]
  const navigation = useNavigation()
  const isLoading = navigation.state === "loading"

  if (isLoading) {
    return (
      <div className="flex gap-4 p-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-full bg-gray-200 animate-pulse" />
            <div className="h-3 w-12 bg-gray-200 animate-pulse rounded" />
          </div>
        ))}
      </div>
    )
  }

  if (highlights.length === 0) {
    return (
      <p className="text-sm text-gray-500 p-4">
        No highlights yet.
      </p>
    )
  }

  return (
    <div className="flex gap-4 p-4 overflow-x-auto">
      {highlights.map((highlight) => (
        <HighlightBubble
          key={highlight.id}
          highlight={highlight}
        />
      ))}
    </div>
  )
}

export function ErrorBoundary() {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    return (
      <div className="p-4">
        <p className="font-semibold">Something went wrong.</p>
        <p className="text-sm text-gray-600">
          {error.status} – {error.statusText || "Failed to load highlights"}
        </p>
      </div>
    )
  }

  if (error instanceof Error) {
    return (
      <div className="p-4">
        <p className="font-semibold">Something went wrong.</p>
        <p className="text-sm text-gray-600">{error.message}</p>
      </div>
    )
  }

  return (
    <div className="p-4">
      <p className="font-semibold">Something went wrong.</p>
      <p className="text-sm text-gray-600">Unknown error</p>
    </div>
  )
}
