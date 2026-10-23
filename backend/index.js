import "dotenv/config"
import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import router from "./routes/routes.js"

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use("/", router)

app.get("/", async (req, res) => {
  res.send("it works")
})

app.listen(3000, () => {
  console.log("service listening on 3000")
})
