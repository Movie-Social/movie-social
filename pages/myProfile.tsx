import Navbar from "@/components/Navbar";
import useCurrentUser from "@/hooks/useCurrentUser";
import { BiUserCircle } from "react-icons/bi";
const MyProfile = () => {
  const { data: currentUser } = useCurrentUser();
  console.log(currentUser, "<<");
  return (
    <main className="flex flex-row w-full">
      <section>
        <h2>Profile</h2>
        <BiUserCircle size={30} />
        <h2>{currentUser.name}</h2>
        <h2>{currentUser.email}</h2>
      </section>
      <section></section>
    </main>
  );
};
export default MyProfile;
