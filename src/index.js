import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";

dotenv.config();

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`server is running on port ${process.env.PORT || 8000}`);
    });
  })
  .catch((err) => {
    console.log("DB error", err);
  });

/* import mongoose from "mongoose";
import { DB_NAME } from "./constants";
import express from "express";
const app = express()

(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on("error", (error)=>{
      console.log(error)
    })
    app.listen(process.env.PORT,()=>{
      console.log(`app is listening on port ${process.env.PORT}`)
    })
  } catch (err) {
    console.log(err);
  }
})(); */

/* const cors = require("cors");
const express = require("express");

const app = express();

app.use(cors())
const port = process.env.PORT || 3000;

const github = {
  id: 12,
  title: "Brown Perfume",
  description: "Royal_Mirage Sport Brown Perfu...",
  price: 40,
  discountPercentage: 15.66,
  rating: 4,
  stock: 52,
  brand: "Royal_Mirage",
  category: "fragrances",
   thumbnail: "https://cdn.dummyjson.com/product-images/12/thumbnail.jpg",
  images: [
    "https://cdn.dummyjson.com/product-images/12/1.jpg",
    "https://cdn.dummyjson.com/product-images/12/2.jpg",
    "https://cdn.dummyjson.com/product-images/12/3.png",
    "https://cdn.dummyjson.com/product-images/12/4.jpg",
    "https://cdn.dummyjson.com/product-images/12/thumbnail.jpg",
  ], 
};

const data = [
  {
    "id":'1',
    "title":"first",
    "data":"This is first data"
  },
  {
    "id":'2',
    "title":"second",
    "data":"This is second data"
  },
  {
    "id":'3',
    "title":"third",
    "data":"This is third data"
  },
  {
    "id":'4',
    "title":"fourth",
    "data":"This is fourth data"
  },
  {
    "id":'5',
    "title":"fifth",
    "data":"This is fifth data"
  },
]

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/login", (req, res) => {
  res.send("<h1>Ahsan Ali</h1>");
});

app.get("/api/github", (req, res) => {
  res.json(github);
});

app.get("/api/data",(req,res)=>{
  res.send(data)
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
 */
