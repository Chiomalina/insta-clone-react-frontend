import { NavLink, Outlet } from "react-router";

export default function ProfileLayout() {
  const activeLinkStyle = {
    boarderBottom: "2px solid black",
    fontWeight: "bold",
  };

  return (
    <div>
      <div>
        <NavLink
          to="/profile/posts/grid"
          className="flex-1 text-center p-4"
          style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
        >
          Posts
        </NavLink>
        <NavLink
          to="/profile/reels/grid"
          className="flex-1 text-center p-4"
          style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
        >
          Reels
        </NavLink>
      </div>
      <main>
      <Outlet />
      </main>
    </div>
  )
}
