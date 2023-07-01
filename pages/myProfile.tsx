import Navbar from "@/components/Navbar";
import useCurrentUser from "@/hooks/useCurrentUser";
import { BiUserCircle } from "react-icons/bi";
const MyProfile = () => {
  const { data: currentUser } = useCurrentUser();
  console.log(currentUser, "<<");
  return (
    <main className="flex justify-center text-white">
      <main className="flex flex-row w-[70vw] h-full border-2 border-red-500 self-center">
        <aside className="border-2 border-yellow-500">
          <h2 className="border-l-2 border-yellow-500 mx-2 px-2 text-1xl lg:text-2xl font-bold">
            Profile
          </h2>
          <div className="flex flex-row items-center">
            <BiUserCircle size={50} />
            <div>
              <h2>{currentUser.name}</h2>
              <h2>{currentUser.email}</h2>
            </div>
          </div>
        </aside>
        <section></section>
      </main>
    </main>
  );
};
export default MyProfile;
