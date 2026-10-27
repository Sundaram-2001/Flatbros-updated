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


router.get("/getPlaces",async(req,res)=>{
  try {
    const {data,error}=await supabase
    .from("places")
    .select("id,name")
    if(error){
      return res.status(500).json({
        message:"Request cannot be processed right now!"
      })
    }
    res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message:"Something went wrong!"
    })
  }
})
router.get("/getProperties", async (req, res) => {
  const { placeId } = req.query
  if (!placeId) {
    return res.status(400).json({ message: "placeId is required" })
  }

  try {
    const { data, error } = await supabase
      .from("properties")
      .select("id, title, rent, furnishing, preference, diet_prefernce, photo")
      .eq("place_id", placeId)

    if (error) {
      return res.status(500).json({ message: error.message })
    }

    res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Something went wrong!" })
  }
})

export default router
