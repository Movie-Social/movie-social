import logger from "./logger";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    //! will only work if i put the raw api key here
    Authorization: process.env.TMDBA || "",
  },
};
const upcomingFetcher = async () => {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
      options
    );
    return response.json();
  } catch (error) {
    logger.error(error);
  }
};
export default upcomingFetcher;
