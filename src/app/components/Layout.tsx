import { Outlet, useLocation, useNavigate } from "react-router";
import { Home, Package, ShoppingCart, ChefHat, Settings } from "lucide-react";

const tabs = [
  { path: "/app", icon: Home, label: "Home" },
  { path: "/app/containers", icon: Package, label: "Containers" },
  { path: "/app/shop", icon: ShoppingCart, label: "Shop" },
  { path: "/app/recipes", icon: ChefHat, label: "Recipes" },
  { path: "/app/settings", icon: Settings, label: "Settings" },
];

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    if (path === "/app") {
      return location.pathname === "/app";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-background">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        <Outlet />
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 shadow-lg">
        <div className="flex justify-around items-center h-20 px-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = isActive(tab.path);
            return (
              <button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                className={`flex flex-col items-center justify-center flex-1 h-full transition-all ${
                  active ? "text-[#E07A5F]" : "text-gray-500"
                }`}
              >
                <Icon className={`w-6 h-6 mb-1 ${active ? "scale-110" : ""} transition-transform`} />
                <span className="text-xs">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
