import axios from "axios";
const fetcher = (url: string) =>
  axios
    .get(url)
    .then((res) => res.data)
    .catch((error) => {
      // Handle error
      console.error(`Error fetching data from ${url}`, error);
      throw error;
    });
export default fetcher;
