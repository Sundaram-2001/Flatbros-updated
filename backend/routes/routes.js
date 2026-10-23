import express from "express"
import supabase from "../db/supabase.js"

const router = express.Router()

router.get("/addPlaces", async (req, res) => {
  const { id, name } = req.body
  console.log(id, name)
  if (!id || !name) {
    return res.status(400).json({
      message: "Invalid body, id and name both are required!",
    })
  }
  res.json(req.body)
})

export default router