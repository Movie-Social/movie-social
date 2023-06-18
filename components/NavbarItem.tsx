import React from "react";

interface NavbarItemProps {
  label: string;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ label }) => {
  return (
    <main className="text-white cursor-pointer hover:text-grey-300 transition">
      {label}
    </main>
  );
};
export default NavbarItem;
