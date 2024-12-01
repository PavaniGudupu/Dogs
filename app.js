import express from "express";
import axios from "axios";
import ejs from "ejs";
import bodyParser from "body-parser";

const app = express();
const APP_URL = "https://dog.ceo/api";
const CONTACT = "";
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/about", (req, res) => {
    res.render("about.ejs");
})

app.get("/contact", (req, res) => {
    res.render("contact.ejs");
})

//random breedDog
app.get("/", async(req, res) => {
    try{
        const response = await axios.get(APP_URL+"/breeds/image/random");
        const request = response.data;
        console.log(request);
        res.render("index.ejs", {content: request.message});

    } catch(error) {
        console.log(error.message);
        res.send(error.message);
    }
});



app.get("/all", async (req, res) => {
   try {
    const response = await axios.get(APP_URL + "/breeds/list/all");
    const request = response.data;
    res.render("data.ejs", {contentData: JSON.stringify(request)});
    } catch (error) {
        console.log(error.message); // Log any errors that occur
        res.send(error.message); // Send the error message to the client
    }
});

//hound
app.get("/hound", async (req, res) => {
    try {
     const response = await axios.get(APP_URL + "/breed/hound/images/random");
     const request = response.data;
     res.render("index.ejs", {content: request.message});
     } catch (error) {
         console.log(error.message); // Log any errors that occur
         res.send(error.message); // Send the error message to the client
     }
 });


 //sub Breeds
 app.get("/houndList", async (req, res) => {
    try {
     const response = await axios.get(APP_URL + "/breed/hound/list");
     const request = response.data;
     res.render("data.ejs", {contentData: JSON.stringify(request)});
     } catch (error) {
         console.log(error.message); // Log any errors that occur
         res.send(error.message); // Send the error message to the client
     }
 });




app.listen(3000, (req, res) => {
    console.log("Server running on port 3000....");
})