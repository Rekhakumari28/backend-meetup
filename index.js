const express = require('express')
const app = express()

const cors = require('cors')
const corsOptions ={
    origin: "*",
    credentials: true,
    optionSuccessStatus:200
}
app.use(cors(corsOptions))

const {initializeDatabase} = require('./db/db.connect')
const Meetup = require('./models/meetup.model')

app.use(express.json())

initializeDatabase()

async function createEvent(newEvent){
    try {
        const events = new Meetup(newEvent)
        const saveEvents = await events.save()
        return saveEvents
    } catch (error) {
     console.log(error)   
    }
}

app.post("/events", async (req,res)=>{
   try {
    const events = await createEvent(req.body)
    res.status(201).json({message: "New event is created.", event: events})

   } catch (error) {
        res.status(500).json({error: "Failed to create event."})
   }
})

async function findAllEvent(){
    try {
       const events = await Meetup.find()
       return events 
    } catch (error) {
     console.log(error)   
    }
}

app.get("/events", async(req,res)=>{
    try {
        const events = await findAllEvent()
        if(events.length !=0){
            res.json(events)
        }else{
            res.status(404).json({error: "Event not found."})
        }
    } catch (error) {
     res.status(500).json({error: "Failed to get all events."})   
    }
})

async function findEventByTitle(eventTitle){
    try {
        const events = await Meetup.findOne({title: eventTitle})
        return events
    } catch (error) {
    console.log(error)       
    }
}

app.get("/events/:eventTitle", async (req,res)=> {
    try{
        const events = await findEventByTitle(req.params.eventTitle)
        if(events){
            res.json(events)
        }else{
            res.status(404).json({error: "Event not found"})
        }
    }catch(error){
        res.status(500).json({error: "Failed to find event."})
    }
})

async function findEventByTags(tagName){
    try {
        const events = await Meetup.findOne({eventTags: tagName})
        return events
    } catch (error) {
        console.log(error)        
    }
}

app.get("/events/tags/:tagName", async(req,res)=>{
    try {
        const events = await findEventByTags(req.params.tagName)
        if(events){
            res.json(events)
        }else{
            res.status(404).json({error: "Event not found"})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to find event."})
    }
})

async function deleteEvent(eventId){
    try{
        const deletedEvent = await Meetup.findByIdAndDelete(eventId)
        // console.log(deletedEvent)
        return deletedEvent
    }catch(error){
        console.log(error)
    }
}

app.delete("/events/:eventId", async (req,res)=>{
    try{
        const deletedEvent = await deleteEvent(req.params.eventId)
        if(deletedEvent){
            res.status(200).json({message: "Event deleted successfully."})
        }else{
            res.status(404).json({error: "Event not found."})
        }
    }catch(error){
        res.status(500).json({error: "Failed to delete event."})
    }
})



const PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log('Server is running on port', PORT)
})
module.exports = app