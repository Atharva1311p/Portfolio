var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
const { Collection } = require("mongodb")
mongoose.set('strictQuery', true);
const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))


mongoose.connect('mongodb+srv://admin:admin13@collections.p6wkv4o.mongodb.net/mydb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in database Connection"));
db.once('open', ()=>console.log("Connected to database"))

app.post("/sign_up", function (req,res) {
    var name = req.body.name;
    var email = req.body.email;
    var subject = req.body.subject;
    var current_date = new Date();
    var data = {
        "Name" : name,
        "Email" : email,
        "Subject" : subject,
        "Received": current_date
    }

    db.collection("enquiry").insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record inserted successfully");
    });

    return res.redirect('contact-us.html')
})

app.get("/", (req,res) =>{
    res.set({
        "Allow-access-Allow-origin": '*'
    })
    return res.redirect('index.html')
}).listen(3000);

console.log("Server is running on port 3000");