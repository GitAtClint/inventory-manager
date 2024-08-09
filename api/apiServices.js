const e = require("express");
const express = require("express");
const knex = require("knex")(require("./knexfile.js")[process.env.NODE_ENV || "development"]);
const cors = require("cors");
const bcrypt = require('bcrypt');
const app = express();
app.use(cors());
app.use(express.json());
const port = 8080;
const saltRounds = 12;

app.get("/", async (req, res) => {
  try {
    const itemList = await knex("item")
      .join("user", "user_id", "=", "user.id")
      .select("item.item_name as name", "item.description as description", "item.quantity as quantity", "user.username as creator");
    res.json(itemList);
  } catch (error) {
    return res.status(400).json({ message: "failed to fetch item details" + error });
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
    return res.status(400).json({ message: "failed to fetch item details" + error });
  }
});

app.post("/inventory/:username", async (req, res) => {
  const { username } = req.params;
  const { item_name, description, quantity } = req.body;
  if (!item_name) {
    return res.status(400).json({ message: "item name is required" });
  }
  if (!description) {
    return res.status(400).json({ message: "description is required" });
  }
  if (!quantity) {
    return res.status(400).json({ message: "quantity is required" });
  } //else if(typeof quantity != 'number')
    //return res.status(400).json({ message: "quantity is must be a number" });

  try {
    const grabUserId = await knex("user")
      .select("id")
      .where({username})
      .first();
    if (!grabUserId)
      return res.status(400).json({ message: "user is missing" })

    const insertItem = await knex("item").insert({
      user_id: grabUserId.id,
      item_name,
      description,
      quantity
    })

    return res.status(201).json({message: "New item added to inventory"});
  } catch (error) {
    return res.status(500).json({ message: "failed to add to inventory. error:" + error });
  }
});

app.patch("/inventory/:itemID", async (req, res) => {
  const { itemID } = req.params;
  const { item_name, description, quantity } = req.body;
  if (!item_name) {
    return res.status(400).json({ message: "item name is required" });
  }
  if (!description) {
    return res.status(400).json({ message: "description is required" });
  }
  if (!quantity) {
    return res.status(400).json({ message: "quantity is required" });
  }

  try {
    const updateItem = await knex("item")
    .where({ id: itemID })
    .update ({ item_name, description, quantity})

    return res.status(202).json({message: "Item updated"});
  } catch (error) {
    return res.status(500).json({ message: "failed to add to inventory. error:" + error });
  }
});

app.delete("/inventory/:itemID", async (req, res) => {
  const { itemID } = req.params;
  try {
    const deleteItem = await knex("item")
    .where({ id: itemID })
    .del();

    if (deleteItem === 0) {
      return res.status(404).json({ message: "Item not found" });
    } else {
      return res.status(202).json({message: "Item successfully removed"});
    }
  } catch (error) {
    return res.status(500).json({ message: "Failed to remove item. error:" + error });
  }
});

//=======================login==================================
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const verifyUser = await knex("user")
      .where({ username: username })
      .first();

    // bcrypt.compare(password, verifyUser.password)
    // .then((result) => {
    //   if (result)
    //     res.status(200).json({ message: "logged in" })
    //   else
    //     res.status(401).json({ message: "invalid password" })
    // })
    const allowLogin = await bcrypt.compare(password, verifyUser.password);

    if (!allowLogin)
      return res.status(401).json({ message: "invalid password" })
    else
      return res.status(200).json({ message: "logged in" })
  } catch {
    return res.status(401).json({ message: "invalid username" })
  }
})

app.post("/createAccount", async (req, res) => {
  const { first_name, last_name, username, password } = req.body;
  if (!first_name) {
    return res.status(400).json({ message: "First Name is required" });
  }
  if (!last_name) {
    return res.status(400).json({ message: "Last Name is required" });
  }
  if (!username) {
    return res.status(400).json({ message: "username is required" });
  }
  if (!password) {
    return res.status(400).json({ message: "password is required" });
  }

  try {
    const grabUserId = await knex("user")
      .select("id")
      .where({username})
      .first();
    if (grabUserId)
      return res.status(400).json({ message: "User already exists" })

    // bcrypt.hash(password, saltRounds)
    // .then((hash) => {
    //   const insertAccount = knex("user").insert({
    //     first_name,
    //     last_name,
    //     username,
    //     password: hash
    //   })
    //   return insertAccount;//note needed due to 
    // })
    // .catch((err) => {
    //   console.log("Hash Brown error. Please try fries", err)
    //   return res.status(400).json({ message: "failed to create new user" })
    // });

    //++note: the sync fetch has a ton of issues. using this async is much better
    //should probably be changed in the learning content
    //https://stackoverflow.com/questions/48799894/trying-to-hash-a-password-using-bcrypt-inside-an-async-function
    const hashPassword = await bcrypt.hash(password, saltRounds)
    const insertAccount = await knex("user").insert({
      first_name,
      last_name,
      username,
      password: hashPassword
    })

    return res.status(200).json({ message: "Account Created, Please Log in" })
  } catch {
    return res.status(401).json({ message: "failed to create new user" })
  }
})

app.listen(port, () => console.log(`Server is running at http://localhost:${port}`));
