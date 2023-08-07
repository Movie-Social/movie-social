import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import { BsBell } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";
import MobileMenu from "./MobileMenu";
import NavbarItem from "./NavbarItem";
import AccountMenu from "./AccountMenu";

const TOP_OFFSET = 66;

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const toggleMobileMenu = () => {
    setShowMobileMenu((current) => !current);
  };

  const toggleAccountMenu = () => {
    setShowAccountMenu((current) => !current);
  };

  return (
    <nav className="w-full fixed z-40">
      <main
        className={`flex flex-row items-center transition duration-500 px-4 md:px-12 py-2 
      ${showBackground ? "bg-zinc-900" : ""}
      `}
      >
        <Image
          width={30}
          height={30}
          onClick={() => router.push("/")}
          className="cursor-pointer w-6 h-6 md:w-8 md:h-8 object-cover rounded-3xl text-white"
          src="/images/newLogo.png"
          alt="Movie Social Logo"
        />
        <section className="flex-row ml-8 gap-7 hidden lg:flex">
          <NavbarItem label="Home" />
          <NavbarItem label="Reviews" />
          {/* <NavbarItem label="Friends" />
          <NavbarItem label="Clubs" /> */}
        </section>
        <section
          onClick={toggleMobileMenu}
          className="
          lg:hidden 
          relative
          flex 
          flex-row 
          items-center 
          gap-2 
          cursor-pointer 
          ml-8 
          "
        >
          <p className="text-white text-sm md:text-base">Browse</p>
          <BsChevronDown
            className={`text-white transition ${
              showMobileMenu ? "rotate-180" : "rotate-0"
            }`}
          />
          <MobileMenu visible={showMobileMenu} />
        </section>
        <section className="flex flex-row content-center gap-6 ml-auto">
          {/* <div className="text-gray-200 hover:text-yellow-300 cursor-pointer transition">
            <BsSearch size={20} />
          </div>
          <div className="text-gray-200 hover:text-yellow-300 cursor-pointer transition">
            <BsBell size={20} />
          </div> */}
          <div
            onClick={toggleAccountMenu}
            className="relative flex flex-row items-center gap-2 cursor-pointer"
          >
            <div className="cursor-pointer text-gray-200 hover:text-yellow-300 transition">
              <BiUserCircle
                className="cursor-pointer w-5 h-5 md:w-7 md:h-7 object-cover rounded-3xl text-white"
                color="white"
                size={20}
              />
            </div>
            <BsChevronDown
              size={20}
              className={`cursor-pointer w-5 h-5 md:w-7 md:h-7 object-cover rounded-3xl text-white hover:text-yellow-300 transition ${
                showAccountMenu ? "rotate-180" : "rotate-0"
              }`}
            />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </section>
      </main>
    </nav>
  );
};
export default Navbar;
