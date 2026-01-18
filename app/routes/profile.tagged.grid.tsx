import { useLoaderData, useNavigation, useRouteError } from "react-router";
import { api } from "~/services/api";
import { taggedSchema, type Tagged } from "~/schemas/tagged.schema";
import { TaggedGridItem } from "~/components/TaggedGridItem";


export async function loader() {
  try {
    const response = await api.get("/tagged/grid");
    return taggedSchema.parse(response.data);
  } catch (error) {
    console.error("Failed to load tagged posts:", error);
    throw new Response("Could not load tagged posts", { status: 500 });
  };
}

export default function TaggedGrid() {
  const tagged = useLoaderData() as Tagged[];
  const navigation = useNavigation();

  // When the loader is running due to navigation (tabclick, link,etc)
  const isLoading = navigation.state === "loading";

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="w-full aspect-square bg-gray-200 animate-pulse" />
        ))}
      </div>
    );
  }

  if (tagged.length === 0) {
    return <p className="text-sm text-gray-500 p-4">No tagged posts yet.</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
      {tagged.map((tag) => (
        <TaggedGridItem key={tag.id} tagged={tag} />
      ))}
    </div>
  );
}

// Route ErrorBoundary (Shows when loader throws)
export function ErrorBoundary() {
  const error = useRouteError();

  // If It's a Response thrown from loader
  if (error instanceof Response) {
    return (
      <div className="p-4">
        <p className="font-semibold">Something went wrong.</p>
        <p className="text-sm text-gray-600">
          {error.status} - { error.statusText || "Failed to load tagged posts"}
        </p>
      </div>
    )
  }

  // Generic fallback
  const message = error instanceof Error ? error.message : "Unknown error";

  return (
    <div className="p-4">
      <p className="font-semibold">Something went wrong.</p>
      <p className="text-sm text-gray-600">{message}</p>
    </div>
  )
}
