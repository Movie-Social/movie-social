import React from "react";

interface MobileMenuProps {
  visible?: boolean;
}
const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
  if (!visible) {
    return null;
  }

  return (
    <main className="bg-black w-56 absolute top-8 left-0 py-f flex-col border-2 border-gray-800">
      <section className="flex flex-col gap-4">
        <div className="px-3 text-center text-white hover:underline">Home</div>
        <div className="px-3 text-center text-white hover:underline">
          Reviews
        </div>
        <div className="px-3 text-center text-white hover:underline">
          Favorites
        </div>
        <div className="px-3 text-center text-white hover:underline">
          Watchlist
        </div>
        <div className="px-3 text-center text-white hover:underline">
          Friends
        </div>
        <div className="px-3 text-center text-white hover:underline">Clubs</div>
      </section>
    </main>
  );
};
export default MobileMenu;
