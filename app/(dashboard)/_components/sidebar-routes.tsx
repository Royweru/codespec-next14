import { FaCompass, FaHome } from "react-icons/fa";
import { SidebarItem } from "./sidebar-item";
const guestRoutes = [
  {
    icon: FaCompass,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: FaHome,
    label: "Browser",
    href: "/search",
  },
];
export const SidebarRoutes = () => {
  const routes = guestRoutes;
  return (
    <div className=" flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem key={route.href} label={route.label} href={route.href} />
      ))}
    </div>
  );
};
