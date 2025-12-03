import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "./route/user.route.js";

import bookRoute from "./route/book.route.js";
import { fileURLToPath } from "url";
import path from "path";
const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;



//connect to mongoDB here
try {
  mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true 
  });
  console.log("Connected to mongoDB");
} catch (error) {
  console.error("Error:", error);
}
 //define routes here
 app.use("/book",bookRoute)
  app.use("/user",userRoute)

//  code for deployment
 if(process.env.NODE_ENV ==="production"){
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  app.use(express.static(path.join(__dirname, "../Frontend/dist")));
  app.use((req,res)=>{
    res.sendFile(path.join(__dirname,"../Frontend/dist","index.html"))
  })
 }


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
