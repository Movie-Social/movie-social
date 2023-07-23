import React from "react";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { BiUserCircle } from "react-icons/bi";
import useCurrentUser from "@/hooks/useCurrentUser";
interface AccountMenuProps {
  visible: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  const router = useRouter();
  const { data: currentUser } = useCurrentUser();
  if (!visible) {
    return null;
  }

  return (
    <main className="bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex">
      <section className="flex flex-col gap-3">
        <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
          <BiUserCircle className="text-white" size={30} />
          <p
            onClick={() => router.push(`/myProfile`)}
            className="text-white text-md group-hover/item:underline"
          >
            {currentUser?.name}
          </p>
        </div>
        <hr className="bg-gray-600 border-0 h-px my-4" />
        <div
          onClick={() => signOut()}
          className="px-3 text-center text-white text-sm hover:underline"
        >
          Sign Out of Movie Social
        </div>
      </section>
    </main>
  );
};
export default AccountMenu;
