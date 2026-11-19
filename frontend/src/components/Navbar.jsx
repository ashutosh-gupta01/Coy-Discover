
import { NavLink } from "react-router-dom";
import { House, Compass, Heart } from "lucide-react";

const navLinks = [
  { to: "/", label: "Home", icon: House, end: true },
  { to: "/discover", label: "Discover", icon: Compass },
  { to: "/matches", label: "Matches", icon: Heart },
];

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white px-4 py-3 shadow-sm sm:px-8 sm:py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-pink-500">
          Coy.
        </h1>

        {/* Navigation Links */}
        <div className="flex items-center gap-5 sm:gap-8">
          {navLinks.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              aria-label={label}
              className={({ isActive }) =>
                `flex items-center gap-1.5 text-sm font-medium transition-colors sm:gap-2 ${
                  isActive
                    ? "text-pink-500"
                    : "text-gray-600 hover:text-pink-500"
                }`
              }
            >
              <Icon size={19} />
              <span className="hidden sm:inline">{label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
