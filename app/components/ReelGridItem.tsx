import type { Reel } from "~/schemas/reel.schema";

export function ReelGridItem({ reel }: { reel: Reel }) {
  return (
    <div className="relative 'aspect-[9/16]' overflow-hidden rounded-xl bg-black group">
      { /* thumbnail */}
      <img
        src={reel.thumbnail_url}
        alt={reel.caption || "Reel thumbnail"}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />

      { /* Gradient overlay */}
      <div className="pointer-events-none absolute inset-0 'bg-gradient-to-t' from-black/70 via-black/20 to-transparent">

        { /* Views badge */}
        <div className="absolute bottom-2 left-2 rounded-md bg-black/60 px-2 py-1 text-white text-sm font-semibold flex gap-1 items-center background-blur-sm">
          ▶️ {reel.views}
        </div>
      </div>

    </div>
  );
}
