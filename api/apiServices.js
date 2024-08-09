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
  const { username } = req.params;
  try {
    const itemList = await knex("item")
      .join("user", "user_id", "=", "user.id")
      .select("item.item_name as name", "item.description as description", "item.quantity as quantity", "item.id as id")
      .where("user.username", username);

    res.json(itemList);
  } catch (error) {
    return res.status(400).json({ error: "failed to fetch item details" + error });
  }
});

app.post("/inventory/:username", async (req, res) => {
  const { username } = req.params;
  const { item_name, description, quantity } = req.body;
  if (!item_name) {
    return res.status(400).json({ error: "item name is required" });
  }
  if (!description) {
    return res.status(400).json({ error: "description is required" });
  }
  if (!quantity) {
    return res.status(400).json({ error: "quantity is required" });
  }

  try {
    const grabUserId = await knex("user")
      .select("id")
      .where({username})
      .first();
    if (!grabUserId)
      return res.status(400).json({ error: "user is missing" })

    const insertItem = await knex("item").insert({
      user_id: grabUserId.id,
      item_name,
      description,
      quantity
    })

    return res.status(201).json({message: "New item added to inventory"});
  } catch (error) {
    return res.status(500).json({ error: "failed to add to inventory. error:" + error });
  }
});

app.patch("/inventory/:itemID", async (req, res) => {
  const { itemID } = req.params;
  const { item_name, description, quantity } = req.body;
  if (!item_name) {
    return res.status(400).json({ error: "item name is required" });
  }
  if (!description) {
    return res.status(400).json({ error: "description is required" });
  }
  if (!quantity) {
    return res.status(400).json({ error: "quantity is required" });
  }

  try {
    const updateItem = await knex("item")
    .where({ id: itemID })
    .update ({ item_name, description, quantity})

    return res.status(202).json({message: "Item updated"});
  } catch (error) {
    return res.status(500).json({ error: "failed to add to inventory. error:" + error });
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
