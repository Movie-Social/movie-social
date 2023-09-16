import { useRouter } from "next/router";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
//* Future Additions
// import { BsBell } from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";
import MobileMenu from "./MobileMenu";
import NavbarItem from "./NavbarItem";
import AccountMenu from "./AccountMenu";
import tmdbMovieFetcher from "@/lib/tmdbMovieFetcher";

const TOP_OFFSET = 66;

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const [searchTerms, setSearchTerms] = useState("");
  const [typing, setTyping] = useState<boolean>(false);
  const [tmdb, setTmdb] = useState();

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

  const handleChange = (event: any) => {
    const { value } = event.target;
    setSearchTerms(value);
  };

  const fetchTmdb = useCallback(async () => {
    const tmdbDetails = await tmdbMovieFetcher(searchTerms);
    const details = tmdbDetails?.results
      .filter((movie: any) => movie.original_language === "en")
      .sort((a: any, b: any) => b.popularity - a.popularity)[0];
    setTmdb(details);
    details.id
      ? router.push(`/movie/tmdb/${details.id}`)
      : router.push(`/404}`);
  }, [router, searchTerms]);

  const toggleMobileMenu = () => {
    setShowMobileMenu((current) => !current);
  };

  const toggleAccountMenu = () => {
    setShowAccountMenu((current) => !current);
  };

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      fetchTmdb();
    }
  };

  return (
    <nav className="w-full fixed z-40">
      <main
        className={`flex flex-row items-center transition duration-500 px-4 md:px-12 py-2 
      ${showBackground ? "bg-zinc-900" : ""}
      `}
      >
        <button>
          <Image
            width={30}
            height={30}
            onClick={() => router.push("/")}
            className="cursor-pointer w-6 h-6 md:w-8 md:h-8 object-cover rounded-3xl text-white"
            src="/images/newLogo.png"
            alt="Movie Social Logo"
          />
        </button>
        <section className="flex-row ml-8 gap-7 hidden lg:flex">
          <button>
            <NavbarItem label="Home" />
          </button>
          <button>
            <NavbarItem label="Reviews" />
          </button>
          {/* //* Future Additions */}
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
          {/* //* Future Additions */}
          <div className="relative flex flex-row items-center text-white hover:text-yellow-300 cursor-pointer transition duration-700">
            {typing ? (
              <div className="transition ease-in-out">
                <input
                  type="text"
                  placeholder="Search By Title"
                  value={searchTerms}
                  onChange={handleChange}
                  className="w-5/6 text-center text-clip text-yellow-300 rounded-md bg-zinc-900 border border-yellow-300 md:p-1 mx-2"
                  onKeyDown={handleKeyPress}
                />
                <BsSearch
                  className="absolute invisible md:visible top-1 left-3 mr-3 bg-zinc-900 self-start text-yellow-300"
                  onClick={fetchTmdb}
                  size={20}
                />
              </div>
            ) : (
              <BsSearch
                className="transition ease-in-out self-center text-white"
                onClick={() => setTyping(true)}
                size={18}
              />
            )}
          </div>
          {/* Future Addition */}
          {/* <div className="text-gray-200 hover:text-yellow-300 cursor-pointer transition">
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
            <button>
              <BsChevronDown
                size={20}
                className={`cursor-pointer w-5 h-5 md:w-7 md:h-7 object-cover rounded-3xl text-white hover:text-yellow-300 transition ${
                  showAccountMenu ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
            <AccountMenu visible={showAccountMenu} />
          </div>
        </section>
      </main>
    </nav>
  );
};
export default Navbar;
