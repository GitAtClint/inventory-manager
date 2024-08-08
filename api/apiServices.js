const e = require("express");
const express = require("express");
const knex = require("knex")(require("./knexfile.js")[process.env.NODE_ENV || "development"]);
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const port = 8080;

app.get("/", async (req, res) => {
  try {
    const itemList = await knex("item")
      .join("user", "user.id", "=", "user_id")
      .select("item.item_name as name", "item.description as description", "user.username as creator");
    res.json(itemList);
  } catch (error) {
    return res.status(400).json({error: "failed to fetch item details" + error});
  }
});

app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));
