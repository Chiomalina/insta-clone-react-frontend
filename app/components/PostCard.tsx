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
    <div className="w-full max-w-lg mx-auto mb-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition-shadow duration-200 ">
      {/* Header  */}
      <div className="flex items-center gap-3 px-4 opacity-3" >
        <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold">
          {username[0].toUpperCase()}
        </div>
        <p className="font-semibold text-sm">{username}</p>
      </div>

      { /*Image  */}
      <div className="w-full aspect-square bg-gray-100">
        <img
          src={imageSrc}
          alt={post.caption || "Instagram post"}
          className="h-full w-full object-cover"
        />
      </div>

      { /* Caption */}
      <div className="p-4 py-3 text-sm">
        <p>
          <span className="font-semibold mr-2">{username}</span>
          <span className="text-gray-700">
            {post.caption || "No caption provided."}
          </span>
        </p>
      </div>
    </div>
  )
}
