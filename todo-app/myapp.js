const express = require('express');
const app = express();
const port = 3000;
const {sequelize,news}=require('./sequConnect');

app.set('view engine', 'ejs');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/todos/:id', function (req, res) {
    console.log('Request Id:', req.params.id);
        news.findAll({
            where:{
              id:req.params.id
            }
          }).then(data => {
            console.log("news data:", JSON.stringify(data));
            res.send(data);
          });   
  });

app.put('/todos/:id',function(req,res){
        news.update({
            newsTitle:req.body.Title
            },{
                where:{id:req.params.id}
            }
        ).then((data)=>{
            news.findAll({
                where:{
                  id:req.params.id
                }
              }).then(temp => {
                console.log("news data:", JSON.stringify(temp));
                res.send(temp);
              }); 
        });
});

app.get('/', (req, res) => {
    res.render('home');
    })

app.get('/add', (req, res) => {
    res.render('add');
    })

app.get('/todos',(req,res)=>{
        news.findAll().then(data => {
            console.log("new data:", JSON.stringify(data));
            res.send(data);
          });
    });

app.post('/todos',(req,res)=>{
        console.log(req.body);
        news.create({newsTitle: req.body.Title,Discription:req.body.Discription}).then(temp => {
            console.log("Inserted Key", temp.ID);
            res.send(temp);
            });
});
  
app.post('/add/task', (req, res) => {
        news.create({newsTitle: nreq.body.Title,Discription:req.body.Discription}).then(temp => {
            console.log("Inserted Key", temp.ID);
            });
    res.send('News Added');})   

sequelize.sync().then(function(){
    app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});
