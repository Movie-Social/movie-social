const Auth = () => {
  return (
    <main className="relative h-full w-full bg-[url('/images/socialHero.png')] bg-no-repeat bg-center bg-fixed bg-cover">
      <section className="bg-black w-full h-full bg-opacity-50 ">
        <nav className="px-12 py-5">
          <img src="/images/socialLogo.png" alt="Logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 w-3/5 max-w-md rounded-md w-full">
            <h2 className="text-white text-3xl mb-8 font-semibold">Sign In</h2>
          </div>
        </div>
      </section>
    </main>
  );
};
export default Auth;
