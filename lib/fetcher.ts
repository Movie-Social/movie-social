import axios from "axios";
import logger from "./logger";

const fetcher = (url: string) =>
  axios
    .get(url)
    .then((res) => res.data)
    .catch((error) => {
      logger.info(`Error fetching data from ${url}`, error);
      throw error;
    });
export default fetcher;
