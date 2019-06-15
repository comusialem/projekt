//jshint esversion:6

require("dotenv").config();
const express = require('express'),
  app = express(),
  bodyParser = require("body-parser"),
  ejs = require('ejs'),
  port = process.env.PORT || 3000,
  server = require('http').Server(app),
  mongoose = require('mongoose'),
  url = 'mongodb://'+process.env.DBUSER+':'+process.env.DBPASSWORD+'@'+process.env.DBHOST+':'+process.env.DBPORT+'/mo1325_ti';

app.use(express.static("public")); //dodaje ścieżkę do szukania elementów strony (css, js itp)
app.set('view engine', 'ejs'); //umożliwia korzystanie z ejs
app.use(bodyParser.urlencoded({
  extended: true
}));

//łączenie z serwerem
server.listen(port, function(){
  console.log('Server connection on port: ' + port);
});

//routing
app.get('/', function(request, response){
  response.render("index");
  response.end();
});

app.get('/galeria', function(request, response){
  Image.find({}, function(err, foundImages){
    response.render("galeria", {newListImages: foundImages});
  });
});

app.get('/oferta', function(request, response){
  response.render("oferta");
});

app.get('/opinie', function(request, response){
  Review.find({}, function(err, foundReviews){
    response.render("opinie", {newListReviews: foundReviews});
  });
});

app.get('/dokumentacja', function(request, response){
  response.render("dokumentacja");
});

app.get('*', function(request, response){
  response.redirect("/");
});
//
app.post('/', function(request, response){
  response.redirect("/");
});

app.post('/galeria', function(request, response){
  response.redirect("galeria");
});

app.post('/oferta', function(request, response){
  response.redirect("oferta");
});

app.post('/opinie', function(request, response){
  response.redirect("opinie");
});

app.post('/dokumentacja', function(request, response){
  response.redirect("dokumentacja");
});

app.post('/addReview', function(request, response){

  let date = new Date();
  let tempGender = request.body.newGender;

  if (tempGender == "Male") {
    gender = "background: linear-gradient(45deg, dodgerblue, slateblue);";
  }else if (tempGender == "Female") {
    gender = "background: linear-gradient(45deg, violet, tomato);";
  }else {
    gender = "background: linear-gradient(45deg, MediumSeaGreen, MediumTurquoise);";
  }

  const newReview = new Review({
    name: request.body.newName,
    surname: request.body.newSurname,
    review: request.body.newReview,
    gender: gender,
    date: date.toLocaleDateString("pl-PL")
  });

  newReview.save();
  response.redirect("opinie");

  console.log("Dodano nową opinię!");

});

app.post('/contact', function(request, response){

  const newContact = new Contact({
    name: request.body.name,
    surname: request.body.surname,
    text: request.body.text,
    new: true
  });

  newContact.save();
  response.redirect("oferta");

  console.log("Wysłano nową wiadomosc!");
});

//nazwa bazy danych: mo1325_ti
//hasło bazy danych: Panda3
mongoose.connect(url, {useNewUrlParser: true}, function(err){
  if (err) {
    throw (err);
  }else{
    console.log("Database connection on port: " + process.env.DBPORT);
  }
});

//Dodawanie zdjec do bazy danych

const imagesSchema = {
  title: String,
  desc: String,
  img: String
};

const Image = mongoose.model("Image", imagesSchema);

// const image0 = new Image({
//   title: "luizclas",
//   desc: "Silhouette of Woman Reaching the Moon",
//   img: "../img/image0.jpg"
// });
//
// const image1 = new Image({
//   title: "Pixabay",
//   desc: "Man in Astronaut Suit",
//   img: "../img/image1.jpg"
// });
//
// const image2 = new Image({
//   title: "Rakicevic Nenad",
//   desc: "Silhouette Photo of Man Throw Paper Plane",
//   img: "../img/image2.jpg"
// });
//
// const image3 = new Image({
//   title: "Aron Visuals",
//   desc: "Green Grass Field",
//   img: "../img/image3.jpg"
// });
//
// const image4 = new Image({
//   title: "Kaique Rocha",
//   desc: "Person Hand and Crescent Moon",
//   img: "../img/image4.jpg"
// });
//
// const image5 = new Image({
//   title: "Johannes Rapprich",
//   desc: "Photo of Galaxy",
//   img: "../img/image5.jpg"
// });
//
// const defaultImages = [image0, image1, image2, image3, image4, image5];
//
// Image.insertMany(defaultImages, function(err){
//   if (err) {
//     console.log(err);
//   }else{
//     console.log("Successfully added images to database.");
//   }
// });


//dodawanie reviews do bazy danych

const reviewsSchema = {
  name: String,
  surname: String,
  review: String,
  gender: String,
  date: String
};

const Review = mongoose.model("Review", reviewsSchema);

//formularz kontaktowy

const contactsSchema = {
  name: String,
  surname: String,
  text: String,
  new: Boolean
};

const Contact = mongoose.model("Contact", contactsSchema);
