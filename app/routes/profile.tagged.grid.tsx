import {
  useLoaderData,
  useNavigation,
  useRouteError,
  isRouteErrorResponse,
} from "react-router"
import { api } from "~/services/api"
import { taggedGridSchema, type TaggedPost } from "~/schemas/tagged.schema"
import { TaggedGridItem } from "~/components/TaggedGridItem"

export async function loader() {
  try {
    const response = await api.get("/tagged/grid")
    return taggedGridSchema.parse(response.data)
  } catch (err) {
    throw new Response("Could not load tagged posts.", { status: 500 })
  }
}

export default function TaggedGridRoute() {
  const tagged = useLoaderData() as TaggedPost[]
  const navigation = useNavigation()
  const isLoading = navigation.state === "loading"

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="w-full aspect-square bg-gray-200 animate-pulse"
          />
        ))}
      </div>
    )
  }

  if (tagged.length === 0) {
    return <p className="text-sm text-gray-500 p-4">No tagged posts yet.</p>
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
      {tagged.map((item) => (
        <TaggedGridItem key={item.id} tagged={item} />
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
          {error.status} - {error.statusText || "Failed to load tagged posts"}
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
