import type { Tagged } from "~/schemas/tagged.schema";

export function TaggedGridItem({ tagged }: { tagged: Tagged }) {
  return (
    <div>
      <img
        src={tagged.thumbnail_url}
        alt={tagged.caption || "Tagged post"}
        className="w-full h-full object-cover"
      />

      {tagged.caption && (
        <div className="absolute bottom-2 left-2 text-white text-sm font-semibold">
          { tagged.caption }
        </div>
      )}
    </div>
  );
}
