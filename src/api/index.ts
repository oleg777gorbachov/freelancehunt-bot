import axios from "axios";
import Keys from "../keys";

axios.defaults.headers.common[
  "Authorization"
] = `Bearer ${Keys.token_freelance}`;

export default axios;
