import axios from "axios";
import pino from "pino";
const logger = pino();
const fetcher = (url: string) =>
  axios
    .get(url)
    .then((res) => resdata)
    .catch((error) => {
      // Handle error
      logger.info(`Error fetching data from ${url}`, error);
      throw error;
    });
export default fetcher;
