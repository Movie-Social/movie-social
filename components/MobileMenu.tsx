import React from "react";
import { useRouter } from "next/router";
interface MobileMenuProps {
  visible?: boolean;
}
const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
  const router = useRouter();

  if (!visible) {
    return null;
  }

  return (
    <main
      className="bg-zinc-900 
    absolute 
    top-8 
    left-0 
    md:opacity-70
    py-2 
    border 
    border-yellow-300"
    >
      <section className="flex flex-col gap-3">
        <div
          className="text-center text-white hover:underline px-3"
          onClick={() => router.push("/")}
        >
          Home
        </div>
        <div
          className="text-center text-white hover:underline px-3"
          onClick={() => router.push("/myProfile")}
        >
          Reviews
        </div>
        <div
          className="text-center text-white hover:underline px-3"
          onClick={() => router.push("/myProfile")}
        >
          Favorites
        </div>
        <div
          className="text-center text-white hover:underline px-3"
          onClick={() => router.push("/myProfile")}
        >
          Watchlist
        </div>
        {/* Future Addition */}
        {/* <div className="px-3 text-center text-white hover:underline">
          Friends
        </div>
        <div className="px-3 text-center text-white hover:underline">Clubs</div> */}
      </section>
    </main>
  );
};
export default MobileMenu;
