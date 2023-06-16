import Input from "@/components/Input";
import { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <main className="relative h-full w-full bg-[url('/images/socialHero.png')] bg-no-repeat bg-center bg-fixed bg-cover">
      <section className="bg-black w-full h-full bg-opacity-50 ">
        <nav className="px-12 py-5">
          <img src="/images/socialLogo.png" alt="Logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 w-3/5 max-w-md rounded-md w-full">
            <h2 className="text-white text-3xl mb-8 font-semibold">Sign In</h2>
            <section className="flex flex-col gap-4">
              <Input
                label="Username"
                onChange={(e: any) => setUsername(e.target.value)}
                id="username"
                value={username}
              />
              <Input
                label="Email"
                onChange={(e: any) => setEmail(e.target.value)}
                id="email"
                type="email"
                value={email}
              />
              <Input
                label="Password"
                onChange={(e: any) => setPassword(e.target.value)}
                id="password"
                type="password"
                value={password}
              />
            </section>
            <button
              className="
            bg-yellow-600
            py-3
            text-white
            rounded-md
            w-full
            mt-10
            hover:bg-yellow-700
            transition
            "
            >
              Login
            </button>
            <p
              className="text-neutral-500
            mt-12"
            >
              First time using Movie Social?{" "}
              <span
                className="text-white
              ml-1
              hover:underline cursor-pointer"
              >
                Create an account
              </span>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};
export default Auth;
