import useCurrentUser from "@/hooks/useCurrentUser";
import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
const Home = () => {
  const { data: user } = useCurrentUser();
  return (
    <main>
      <h1 className="text-2xl text-yellow-500">Movie Social</h1>
      <p className="text-white">Logged in as: {user?.name}</p>
      <button className="h-10 w-full bg-white" onClick={() => signOut()}>
        Logout!
      </button>
    </main>
  );
};
export default Home;
