import Input from "@/components/Input";
import { useState } from "react";
import axios from "axios";
import { useCallback } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import logger from "@/lib/logger";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");
  const router = useRouter();
  const toggleVariant = () => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  };

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });

      router.push("/");
    } catch (error: any) {
      logger.error(error.message);
    }
  }, [email, password, router]);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        name,
        password,
      });
      login();
    } catch (error: any) {
      logger.error(error.message);
    }
  }, [email, name, password, login]);

  return (
    <main className="relative h-full w-full bg-[url('/images/socialHero.png')] bg-no-repeat bg-center bg-fixed bg-cover">
      <section className="bg-black w-full h-full lg:bg-opacity-50 ">
        <nav className="px-12 py-5">
          <img src="/images/socialLogo.png" alt="Logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-2xl mb-8 font-semibold">
              {variant === "login" ? "Sign In" : "Create An Account"}
            </h2>
            <section className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  label="Username"
                  onChange={(e: any) => setName(e.target.value)}
                  id="name"
                  value={name}
                />
              )}
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
              onClick={variant === "login" ? login : register}
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
              {variant === "login" ? "Login" : "Sign Up"}
            </button>
            <div
              className="
             flex
             flex-row
             items-center
             gap-4
             mt-8
             justify-center

              "
            >
              <div
                onClick={() => signIn("google", { callbackUrl: "/" })}
                className="w-10
                h-10
                bg-white
                rounded-full
                flex
                items-center
                justify-center
                cursor-pointer
                hover:opacity-80
                transition"
              >
                <FcGoogle size={30} />
              </div>
              <div
                onClick={() => signIn("github", { callbackUrl: "/" })}
                className="w-10
                h-10
                bg-white
                rounded-full
                flex
                items-center
                justify-center
                cursor-pointer
                hover:opacity-80
                transition"
              >
                <FaGithub size={30} />
              </div>
            </div>
            <p
              className="text-neutral-500
      text-md
            mt-12"
            >
              {variant === "login"
                ? "First time Using Movie Social"
                : "Already have an account?"}
              <span
                onClick={toggleVariant}
                className="text-white
      text-md

              ml-1
              hover:underline cursor-pointer"
              >
                {variant === "login" ? "Create an account" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};
export default Auth;
