const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@emporiumc1.k1lbefa.mongodb.net/?retryWrites=true&w=majority&appName=EmporiumC1`;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@recipes.zx59asa.mongodb.net/?retryWrites=true&w=majority&appName=recipes`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const recipeCollection = client.db("recipeDB").collection("recipes");

    // YOU MAY USE THOSE VAR DRILL
    // const id = req.params.id;
    // const query = { _id: new ObjectId(id) };
    // const result = await coffeeCollection.deleteOne(query);

    // UPLOAD or POST A DATA
    app.post("/recipes", async (req, res) => {
      const newRecipe = req.body;
      const result = await recipeCollection.insertOne(newRecipe);
      res.send(result);
    });

    // LOAD ALL  COLLECTION   DATA
    app.get("/recipes", async (req, res) => {
      const result = await recipeCollection.find().toArray();
      res.send(result);
    });

    // LOAD SPECIFIC  DATA BY IT'S ID
    app.get(`/recipes/:id`, async (req, res) => {
      const result = await recipeCollection.findOne({
        _id: new ObjectId(req.params.id),
      });
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("send responding....");
});

app.listen(port, () => {
  console.log(`your port port ${port}`);
});
