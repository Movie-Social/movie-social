import React from "react";
import Router, { useRouter } from "next/router";
interface MobileMenuProps {
  visible?: boolean;
}
const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
  const router = useRouter();

  if (!visible) {
    return null;
  }

  return (
    <main className="bg-zinc-900 w-56 absolute top-8 left-0 py-2 flex-col border border-yellow-300">
      <section className="flex flex-col gap-3">
        <div
          className="px-3 text-center text-white hover:underline"
          onClick={() => router.push("/")}
        >
          Home
        </div>
        <div
          className="px-3 text-center text-white hover:underline"
          onClick={() => router.push("/myProfile")}
        >
          Reviews
        </div>
        <div
          className="px-3 text-center text-white hover:underline"
          onClick={() => router.push("/myProfile")}
        >
          Favorites
        </div>
        <div
          className="px-3 text-center text-white hover:underline"
          onClick={() => router.push("/myProfile")}
        >
          Watchlist
        </div>
        {/* <div className="px-3 text-center text-white hover:underline">
          Friends
        </div>
        <div className="px-3 text-center text-white hover:underline">Clubs</div> */}
      </section>
    </main>
  );
};
export default MobileMenu;
