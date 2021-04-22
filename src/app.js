const path = require('path');
const express = require('express');
const chalk = require('chalk');
const hbs = require('hbs');
const geocode =require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 5000;

// Define path for Express config
const publicDirectory = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');
hbs.registerPartials(partialsPath);


// Set up handlebars engine nd views location
app.set('view engine','hbs');
app.set('views',viewsPath);

// Set up static directory to serve
app.use(express.static(publicDirectory));

app.get('',(req,res)=>{
    res.render('index',{
        title : 'Weather',
        name : 'Amit Purohit'
    });
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'About',
        name : 'Amit Purohit'
    });
});

app.get('/help',(req,res)=>{
    res.render('help',{
        title : 'Help',
        message : 'This is help message',
        name : 'Amit Purohit'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error : 'Address term required!!'
        });
    }
    // console.log(res.query);

    geocode(req.query.address,(err,{lattitude,longitude,place}={})=>{
        if(err){
            return res.send({
                error : err
            });
        } else {
            forecast(lattitude,longitude,(error,fc)=>{
                if(err){
                    return res.send({
                        error
                    });
                }else{
                    res.send({
                        weather_forecast:fc,
                        location:place,
                        address : req.query.address
                    });
                }
            })
        }
    });

    
});

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error : 'Search term not provided!'
        });
    }
    res.send({
        products : []
    });
});

app.get('/help/*',(re1,res)=>{
    res.render('404',{
        title : 'Help 404',
        name : 'Amit Purohit',
        message : 'Help article not found!'
    });
});

app.get('*',(req,res)=>{
    res.render('404',{
        title : '404',
        name : 'Amit Purohit',
        message : 'Page not found!'
    });
})

app.listen(port,()=>{
    console.log(chalk.green('Server up and running on port ' + port +' !!'));
});
