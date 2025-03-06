import axios from "axios";

export const fetchAPIData = () => {
  return axios.get("https://jsonplaceholder.typicode.com/posts"); // Fetch all posts
};
