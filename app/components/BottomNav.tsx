import { Link, useLocation } from "react-router";

export function BottomNav() {
  const { pathname } = useLocation();


  const baseItem = "inline-flex flex-col items-center justify-center px-5 transition-colors duration-200";
  const activeItem = "text-block";
  const inactiveItem = "text-gray-400 hover:text-black";

  return (
    <footer className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200">
      <div className=" grid h-full max-w-lg grid-cols-5 mx-auto">
        <Link
          to="/home"
          className={`${baseItem} ${pathname === "/home" ? activeItem : inactiveItem
            }`}
        >
          <span className="text-xl">🏠</span>
        </Link>

        <button className={`${baseItem} ${inactiveItem}`}>
          <span className="text-xl">🔍</span>
        </button>


        <Link
          to="/create"
          className={`${baseItem} ${
            pathname === "/create" ? activeItem : inactiveItem
          }`}
        >
          <span className="flex items-center justify-center w-10 h-10 text-xl font-bold border border-black rounded-lg">
            ➕
          </span>
        </Link>

        <Link
          to="/"
          className={`${baseItem} ${
            pathname === "/" ? activeItem : inactiveItem
          }`}
        >
          <span className="text-sm font-medium">Reels</span>
        </Link>

        <Link
          to="/profile"
          className={`${baseItem} ${
            pathname === "/profile" ? activeItem : inactiveItem
          }`}
        >
          <span className="text-xl">👤</span>
        </Link>
      </div>
  </footer>
  )
}
