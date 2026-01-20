import { API_BASE_URL } from "../config";

type PostLike = {
  img_url: string
  caption: string | null
}

export function PostCard({
  post,
  username = "webeet_user",
}: {
  post: PostLike
  username?: string
  }) {

    const imageSrc = post.img_url.startsWith("http")
      ? post.img_url
      : `${API_BASE_URL}${post.img_url}`;
  return (
    <div className="w-full max-w-lg mx-auto rounded-lg overflow-hidden border bg-white mb-6">
      <div className="p-4">
        <p className="font-bold">{username}</p>
      </div>

      <img
        src={imageSrc}
        alt={post.caption || "Instagram post"}
        className="w-full h-auto aspect-square object-cover"
      />

      <div className="p-4">
        <p>
          <span className="font-bold mr-2">{username}</span>
          {post.caption}
        </p>
      </div>
    </div>
  )
}
