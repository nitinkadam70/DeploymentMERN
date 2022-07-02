const express = require("express")
const ProductModel = require("./model/product")
const connection = require("./db")

require("dotenv").config();

const app = express();

app.use(express.json());

app.get("/products",(req,res)=>{
    res.send("Homepage")
})

app.get("/products", async (req, res) => {
    const products = await ProductModel.find()
    res.send(products)
})

app.post("/products/prod", async (req, res) => {
    const product = await new ProductModel(req.body)
    await product.save();
    res.send(product)
})

app.listen(process.env.PORT, async () => {
    try {
        await connection;
    }
    catch {
        console.log("Something went wrong while connecting to db")
    }
    console.log(`listening on ${process.env.PORT}`)
})