const Footer = () => {
  return (
    <main className="flex flex-col md:flex-row justify-between items-center w-full md:w-5/6 self-center text-white text-xs md:text-base mt-8 pt-2">
      <h2>Created and designed by Kendall McGree</h2>
      <section className="flex flex-row justify-evenly md:justify-between items-center w-full mt-2 md:mt-0 md:w-1/6">
        <a
          href="https://www.linkedin.com/in/kendall-mcgree/"
          target="_blank"
          className="hover:text-yellow-300 hover:underline transition ease-in-out duration-300"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/kendallm360"
          target="_blank"
          className="hover:text-yellow-300 hover:underline transition ease-in-out duration-300"
        >
          Github
        </a>
        <a
          href="https://kendalls-portfolio.vercel.app/"
          target="_blank"
          className="hover:text-yellow-300 hover:underline transition ease-in-out duration-300"
        >
          Portfolio
        </a>
      </section>
    </main>
  );
};
export default Footer;
