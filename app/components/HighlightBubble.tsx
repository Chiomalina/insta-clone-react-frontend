import { Link } from "react-router"
import type { Highlight } from "~/schemas/highlight.schema"

export function HighlightBubble({ highlight }: { highlight: Highlight }) {
  return (
    <Link
      to={`/profile/highlights/${highlight.id}`}
      className="flex flex-col items-center gap-2 w-20"
    >
      <div className="w-16 h-16 rounded-full overflow-hidden border bg-white">
        <img
          src={highlight.cover_image_url}
          alt={highlight.title ?? "Highlight"}
          className="w-full h-full object-cover"
        />
      </div>

      <p className="text-xs text-center truncate w-full">
        {highlight.title ?? "Untitled"}
      </p>
    </Link>
  )
}
