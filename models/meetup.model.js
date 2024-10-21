const mongoose = require('mongoose')

const meetupSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    typeOfEvent: {
      type:  String,
      required: true,
      default: "Both",
      enum: ["Online","Offline","Both"]
    },
    hostedBy: {
        type: String,
    },
    startTime: {
        type: String,
        required: true
    },
    endTime:{
        type: String,
       
    },
    city: {
        type: String,
    },
    address: {
        type: String,
    },
    price: {
        type: String,
    },
    speakers: [ {person:{
        name: String,
        designation: String,
        imageUrl: String
        }
    }],
    details: {
        type: String,
    },
    dressCode: {
        type: String,
    },
    ageRestriction: {
        type: String,
    },
    eventTags:[ {
        type: String,
    }],
    imageUrl : {
        type: String,
    },

},{timestamps: true})

const Meetup = mongoose.model("Meetup", meetupSchema)
module.exports = Meetup