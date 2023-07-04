import logger from "@/lib/logger";

const omdbFetcher = async (title: any) => {
  try {
    if (!title) {
      return null;
    }
    let fetchString;
    if (title.split("").includes(":")) {
      fetchString = title.split(": ").join("+").split(" ").join("+");
    } else {
      fetchString = title.split(" ").join("+");
    }

    const response = await fetch(
      `https://www.omdbapi.com/?t=${fetchString}&apikey=${process.env.NEXT_PUBLIC_OMDB}`
    );
    return response.json();
  } catch (error) {
    logger.error(error);
  }
};

export default omdbFetcher;
