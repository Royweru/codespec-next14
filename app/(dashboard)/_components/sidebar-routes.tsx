"use client";
import { FaCompass, FaHome } from "react-icons/fa";
import { SidebarItem } from "./sidebar-item";
import { BarChart, List } from "lucide-react";
import { usePathname } from "next/navigation";
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
const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
  },
];
export const SidebarRoutes = () => {
  const pathName = usePathname();
  const isTeacherPage = pathName?.includes("/teacher");
  const routes = isTeacherPage ? teacherRoutes : guestRoutes;
  return (
    <div className=" flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem key={route.href} label={route.label} href={route.href} />
      ))}
    </div>
  );
};
