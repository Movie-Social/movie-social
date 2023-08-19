import axios from "axios";
// import logger from "./logger";

const fetcher = (url: string) =>
  axios
    .get(url)
    .then((res) => res.data)
    .catch((error) => {
      console.log(`Error fetching data from ${url}`, error);
      throw error;
    });
export default fetcher;
