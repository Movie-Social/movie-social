const Navbar = () => {
  return (
    <nav className="w-full fixed z-40">
      <main className="px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 bg-zinc-900 bg-opacity-90">
        <img
          className="h-9 lg:h-20"
          src="/images/socialLogo.png"
          alt="Movie Social Logo"
        />
        <section className="flex-row ml-8 gap-7 hidden lg:flex">
          {/* <NavbarItem /> */}
        </section>
      </main>
    </nav>
  );
};
export default Navbar;
