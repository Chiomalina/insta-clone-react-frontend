import type { TaggedPost } from "~/schemas/tagged.schema"
import { PostCard } from "~/components/PostCard"

export function TaggedGridItem({ tagged }: { tagged: TaggedPost }) {
  return (
    <PostCard
      post={tagged}
      username={tagged.tagged_by.username}
    />
  )
}
