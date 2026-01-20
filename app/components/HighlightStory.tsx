import type { Highlight } from "~/schemas/highlight.schema"

export function HighlightStory({ highlight }: { highlight: Highlight }) {
  return (
    <div className="fixed inset-0 bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-between mb-4">
          <p className="font-semibold truncate">
            {highlight.title ?? "Highlight"}
          </p>
        </div>

        <div className="w-full `aspect-[9/16]` rounded-xl overflow-hidden bg-gray-900">
          <img
            src={highlight.cover_image_url}
            alt={highlight.title ?? "Highlight"}
            className="w-full h-full object-cover"
          />
        </div>

        <p className="mt-4 text-sm text-gray-300">
          Highlight ID: {highlight.id}
        </p>
      </div>
    </div>
  )
}
