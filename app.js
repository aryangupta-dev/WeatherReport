const express=require("express");
const app=express();
const bodyParser=require("body-parser");

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
const https=require("https");
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});
var head="";
var description="";
var iconUrl="";
app.post("/",function(req,res){
  const cityName=req.body.cityName;
  const url="https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=96f0fdf3f8ed27504bc230eb08846cd4&units=metric";
  https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
      const weather=JSON.parse(data);
      head="The temperatue in the "+ weather.name+" is "+weather.main.temp+"'C";
       description=weather.weather[0].description;
      const icon=weather.weather[0].icon;
      iconUrl="http://openweathermap.org/img/wn/"+ icon +"@2x.png"
      const img="<img src="+ iconUrl +">";
    })
    res.redirect("/result")
  })

});
app.get("/result",function(req,res){
  res.render("result",{temperatue:head,skyDescription:description,imagesky:iconUrl});
});
app.post("/home",function(req,res){
  res.redirect("/")
});

app.listen(process.env.PORT||3000,function(){
  console.log("Server is started at port 3000");
});
