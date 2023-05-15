import "dotenv/config";

interface Keys {
  token_telegram: string;
  token_freelance: string;
  db: string;
}

const Keys: Keys = {
  token_telegram: process.env["TOKEN_TELEGRAM"] || "null",
  token_freelance: process.env["TOKEN_FREELANCE"] || "null",
  db: process.env["DATABASE"] || "null",
};

for (let key of Object.values(Keys)) {
  if (key === "null") {
    console.log("ENV error");
    process.exit();
  }
}

export default Keys;
