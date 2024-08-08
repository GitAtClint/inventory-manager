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
      .join("user", "user_id", "=", "user.id")
      .select("item.item_name as name", "item.description as description", "item.quantity as quantity", "user.username as creator");
    res.json(itemList);
  } catch (error) {
    return res.status(400).json({ error: "failed to fetch item details" + error });
  }
});
//==========================inventory==========================
app.get("/inventory/:username", async (req, res) => {
  const {username} = req.params;
  try {
    const itemList = await knex("item")
      .join("user", "user_id", "=", "user.id")
      .select("item.item_name as name", "item.description as description", "item.quantity as quantity")
      .where("user.username", username);

    res.json(itemList);
  } catch (error) {
    return res.status(400).json({ error: "failed to fetch item details" + error });
  }
});
table.integer('user_id').references('id').inTable('user').notNullable();
        table.string('item_name').notNullable();
        table.string('description').notNullable();
        table.integer('quantity').notNullable();
    });

app.post("/inventory/:username", async (req, res) => {
  const {username} = req.params;
  const {name, description, quantity} = req.body;
  try {
    const insertItem = await knex("item").insert(
      user.
      name,
      description,
      quantity
    )
      .join("user", "user_id", "=", "user.id")
      .select("item.item_name as name", "item.description as description", "item.quantity as quantity")
      .where("user.username", username);

    res.json(itemList);
  } catch (error) {
    return res.status(400).json({ error: "failed to fetch item details" + error });
  }
});
//=======================login==================================
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const verifyUser = await knex("user")
      .where({ username: username })
      .first();

    if (!verifyUser)
      return res.status(401).json({ message: "invalid username" });
    else if (verifyUser.password !== password)
      return res.status(401).json({ message: "invalid password" })
    else
      return res.status(200).json({ message: "logged in" })
  } catch {
    return res.status(401).json({ message: "failed to login" })
  }
})

app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));
