const express = require('express');
const app = express();
const mongoose = require('mongoose');
const FriendModel = require('./models/Friends');
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.json());

mongoose.connect(
        process.env.DB, 
        {useNewUrlParser: true, useUnifiedTopology: true},
        )
        .then(() => {
            console.log("Mongoose is connected!")
        })
        .catch(() => console.log("Mongoose could not be connected!"));

const dbConnection = mongoose.connection;
dbConnection.on('error', (error) => {
    console.log(`Connection error: ${error}`);
})

dbConnection.once('open', () => {
    console.log("DB connected!");
})

// app.get("/insert", async (req, res) => {
//     const friend = new FriendModel({name: "Joe", age: 30});
//     await friend.save((err) => {
//         if(err) return handleError(err);
//         console.log("Data inserted");
//     });
//     console.log("After function save");
//     res.send("Record inserted");
    
// });

// app.get("/insert", (req, res) => {
//     const friend = new FriendModel({name: "Joey", age: 20});
//     friend.save()
//     .then(() => res.send("Record inserted"))
//     .catch((err) => { return handError(err); });
    
// });

app.post("/addFriend", (req, res) => {
    const friend = new FriendModel({name: req.body.name, age: req.body.age});
    friend.save()
    .then((savedFriend) => {res.status(201).json(savedFriend);})
    .catch((err) => { res.status(500).json(err) });
});

app.get("/read", (req, res) => {
     FriendModel.find({})
     .then((data) => res.status(200).json(data))
     .catch((err) => {res.status(500).json(err)});
});

app.delete("/delete/:id", (req, res)=>{
    FriendModel.findByIdAndDelete(req.params.id)
    .then((friend) =>res.status(200).json(friend) )
    .catch((err) => res.send(err));
});

app.put("/update", (req, res) => {
    FriendModel.findByIdAndUpdate(req.body.id, {name: req.body.name, age: req.body.age})
    .then((upFriend) => res.status(200).json(upFriend))
    .catch(err => res.status(200).json(err));
});

app.listen(process.env.PORT, () => {
    console.log("Express Server is on!");
});