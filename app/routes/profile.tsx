import { NavLink, Outlet } from "react-router";

const tabs = [
  {to:"/profile/posts/grid", label:"Posts", icon: "#" },
  {to:"/profile/reels/grid", label:"Reels", icon: "▶" },
  {to:"/profile/tagged/grid", label:"Tagged", icon: "👤" },
  {to:"/profile/highlights", label:"highlights", icon: "★" },
]

export default function ProfileLayout() {
  const activeLinkStyle = {
    borderBottom: "2px solid black",
    fontWeight: "bold",
  };

  return (
      <div className="w-full">
        {/* Tabs */}
        <div className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-gray-200">
          <nav className="mx-auto max-w-3xl">
            <ul className="grid grid-cols-4">
              {tabs.map((tab) => (
                <li key={tab.to} className="relative">
                  <NavLink
                    to={tab.to}
                    end
                    className={({ isActive }) =>
                      [
                        "group flex flex-col items-center justify-center gap-1 py-3",
                        "text-xs uppercase tracking-wide",
                        "transition-colors",
                        isActive ? "text-black font-semibold" : "text-gray-500 hover:text-black",
                      ].join(" ")
                    }
                  >
                    {/* icon row */}
                    <span className="text-base leading-none">{tab.icon}</span>
                    <span>{tab.label}</span>

                    {/* indicator */}
                    <span
                      className={[
                        "absolute bottom-0 left-0 h-[2px] w-full",
                        "transition-opacity",
                        "bg-black",
                        // only show when active
                        "opacity-0 group-[.active]:opacity-100",
                      ].join(" ")}
                    />
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Content */}
        <main className="mx-auto max-w-3xl">
          <Outlet />
        </main>
      </div>
    );
}
