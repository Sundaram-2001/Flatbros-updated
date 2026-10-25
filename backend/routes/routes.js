import express from "express"
import supabase from "../db/supabase.js"

const router = express.Router()

router.post("/addPlaces", async (req, res) => {
  const { id, name } = req.body
  if (!id || !name) {
    return res.status(400).json({
      message: "Invalid body, id and name both are required!",
    })
  }

  try {
    const { data, error } = await supabase
      .from("places")
      .insert({ id, name })
      .select()
      .single()

    if (error) {
      return res.status(500).json({ message: error.message })
    }

    res.status(201).json(data)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
