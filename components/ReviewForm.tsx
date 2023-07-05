import useCurrentUser from "@/hooks/useCurrentUser";
import { BiUserCircle } from "react-icons/bi";

const Reviewform = () => {
  const currentUser = useCurrentUser();
  return (
    <main className="border-2 border-red-300">
      <div className="flex flex-row">
        <BiUserCircle size={30} />
        {currentUser.data.name}
      </div>
      <div className="stars"></div>
    </main>
  );
};
export default Reviewform;
