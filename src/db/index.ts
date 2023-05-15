import { connect } from "mongoose";
import Keys from "../keys";

try {
  connect(Keys.db).then(() => console.log("CONNECTED TO DB"));
} catch (error) {
  console.log("DATABASE ERROR " + error);
  process.exit();
}
