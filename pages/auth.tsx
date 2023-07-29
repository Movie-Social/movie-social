import { useState } from "react";
import { useCallback } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Input from "@/components/Input";
import logger from "@/lib/logger";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

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
    <main className="relative h-full w-full bg-[url('/images/socialHero.png')] bg-center bg-fixed bg-no-repeat">
      <main className="w-full h-full bg-black lg:bg-opacity-50">
        <section className="flex justify-center items-center content-center h-full ">
          <section className="w-full md:w-4/5 lg:w-2/5 px-16 py-16 bg-black bg-opacity-70 rounded-md lg:max-w-md">
            <h2 className="text-white text-2xl font-semibold mb-8">
              {variant === "login" ? "Sign In" : "Create An Account"}
            </h2>
            <form
              className="
            flex 
            flex-col 
            gap-4
            "
            >
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
            </form>
            <button
              onClick={variant === "login" ? login : register}
              className="
              w-full
              text-white
              mt-10
              py-3
              bg-yellow-300
              hover:bg-yellow-700
              rounded-md
              transition
            "
            >
              {variant === "login" ? "Login" : "Sign Up"}
            </button>
            <nav
              className="
             flex
             flex-row
             justify-center
             items-center
             gap-4
             mt-8
              "
            >
              <div
                onClick={() => signIn("google", { callbackUrl: "/" })}
                className="
                cursor-pointer
                flex
                justify-center
                items-center
                w-10
                h-10
                bg-white
                rounded-full
                hover:opacity-80
                transition"
              >
                <FcGoogle size={30} />
              </div>
              <div
                onClick={() => signIn("github", { callbackUrl: "/" })}
                className="
                cursor-pointer
                flex
                justify-center
                items-center
                w-10
                h-10
                bg-white
                rounded-full
                hover:opacity-80
                transition"
              >
                <FaGithub size={30} />
              </div>
            </nav>
            <p className="text-neutral-500 text-md mt-12 md:text-center">
              {variant === "login"
                ? "First time Using Movie Social? | "
                : "Already have an account? | "}
              <span
                onClick={toggleVariant}
                className="text-white text-md ml-1 hover:underline cursor-pointer"
              >
                {variant === "login" ? "Create an account" : "Login"}
              </span>
            </p>
          </section>
        </section>
      </main>
    </main>
  );
};
export default Auth;
