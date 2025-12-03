// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";
// import userRoute from "./route/user.route.js";

// import bookRoute from "./route/book.route.js";
// import path from "path";
// const app = express();
// app.use(cors());
// app.use(express.json());

// dotenv.config();

// const PORT = process.env.PORT || 4000;
// const URI = process.env.MongoDBURI;



// //connect to mongoDB here
// try {
//   mongoose.connect(URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
//   console.log("Connected to mongoDB");
// } catch (error) {
//   console.error("Error:", error);
// }
//  //define routes here
//  app.use("/book",bookRoute)
//   app.use("/user",userRoute)

// //  code for deployment
//  if(process.env.NODE_ENV ==="production"){
//   const dirPath = path.resolve()

 
//   app.get(/.*/,(req,res)=>{
//     res.sendFile(path.join(dirPath,"./Frontend/dist","index.html"))
//   })
//  }


// app.listen(PORT, () => {
//   console.log(`Server is listening on port ${PORT}`);
// });

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "./route/user.route.js";
import bookRoute from "./route/book.route.js";
import path from "path";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;

// Connect to MongoDB
mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// API routes
app.use("/book", bookRoute);
app.use("/user", userRoute);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  const dirPath = path.resolve();

  // Serve static files
  app.use(express.static(path.join(dirPath, "Frontend/dist")));

  // Wildcard route for SPA
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(dirPath, "Frontend/dist", "index.html"));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});

