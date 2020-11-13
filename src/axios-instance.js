import axios from "axios";

const instance = axios.create({
  baseURL: "https://paperflix-api.ue.r.appspot.com/api/",
});

export default instance;
