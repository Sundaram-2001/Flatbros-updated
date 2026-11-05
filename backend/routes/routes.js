import express from "express"
import supabase from "../db/supabase.js"

const router = express.Router()
const publicPropertyFields = "id, bhk, rent, gender"

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
    console.error("Place ID is not passed")
    return res.status(400).json({ message: "Request not passed correctly, kindly contact the support team for further assistance!" })
  }

  try {
    const { data, error } = await supabase
      .from("properties")
      .select(publicPropertyFields)
      .eq("place_id", placeId)

    if (error) {
      console.error("Unable to fetch the data:",error.message)
      return res.status(500).json({ message: error.message })
    }

    res.json(data ?? [])
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Something went wrong!" })
  }
})

router.get("/getProperty", async (req, res) => {
  const { propertyId } = req.query
  if (typeof propertyId !== "string" || !propertyId.trim()) {
    return res.status(400).json({ message: "A property ID is required." })
  }

  const { data, error } = await supabase
    .from("properties")
    .select(publicPropertyFields)
    .eq("id", propertyId)
    .maybeSingle()

  if (error) {
    console.error("Unable to fetch property:", error.message)
    return res.status(500).json({ message: "Could not load property details." })
  }

  if (!data) {
    return res.status(404).json({ message: "Property not found." })
  }

  res.json(data)
})

export default router
