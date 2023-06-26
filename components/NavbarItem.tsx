import React from "react";

interface NavbarItemProps {
  label: string;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ label }) => {
  return (
    <main className="text-white cursor-pointer hover:text-yellow-300 transition">
      {label}
    </main>
  );
};
export default NavbarItem;
