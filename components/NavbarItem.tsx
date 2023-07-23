import React, { useState } from "react";
import { useRouter } from "next/router";
interface NavbarItemProps {
  label: string;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ label }) => {
  const router = useRouter();

  const route = () => {
    if (label === "Reviews" || label === "Favorites" || label === "Watchlist") {
      router.push("/myProfile");
    }
    if (label === "Home") {
      router.push("/");
    }
  };

  return (
    <main
      className="text-white cursor-pointer hover:text-yellow-300 transition"
      onClick={route}
    >
      {label}
    </main>
  );
};
export default NavbarItem;
