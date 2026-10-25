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
    const {data,error:dataError}=await supabase
    .from("places")
    .select("id","name")
    if(!data){
      res.status(500).json({
        message:"Request cannot be processed right now, try again later!"
      })
      return data
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message:"Something went wrong!"
    })
  }
})
export default router
