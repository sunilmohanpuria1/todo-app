const express = require('express');
const app = express();
const port = 3000;
const {sequelize,news}=require('./sequConnect');

app.set('view engine', 'ejs');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(express.urlencoded());

app.get('/todos/:id', function (req, res) {
    console.log('Request Id:', req.params.id);
    sequelize.sync().then(function (){
        news.findAll({
            where:{
              id:req.params.id
            }
          }).then(data => {
            console.log("news data:", JSON.stringify(data));
            res.send(data);
          });
        });   
  });

app.put('/todos/:id',function(req,res){
    sequelize.sync().then(function(){
        let id= req.params.id;
        let newsTitle= req.body.Title;
        news.update({
            newsTitle:req.body.Title
            },{
                where:{id:id}
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
});

app.get('/', (req, res) => {
    res.render('home');
    })

app.get('/add', (req, res) => {
    res.render('add');
    })

app.get('/todos',(req,res)=>{
    sequelize.sync().then(function (){
        news.findAll().then(data => {
            console.log("new data:", JSON.stringify(data));
            res.send(data);
          });
        });
    });


app.post('/todos',(req,res)=>{
    sequelize.sync().then(function (){
        console.log("req.body\n");
        console.log(req.body);
        let Discription= req.body.Discription;
        let newsTitle= req.body.Title;
        //console.log(newsTitle);
        news.create({newsTitle: newsTitle,Discription:Discription}).then(temp => {
            console.log("Inserted Key", temp.ID);
            res.send(temp);
            });
    });
});

        
app.post('/add/task', (req, res) => {
   
        let Discription= req.body.Discription;
        let newsTitle= req.body.Title;
        console.log(Discription,newsTitle);

        sequelize.sync().then(function (){
            news.create({newsTitle: newsTitle,Discription:Discription}).then(temp => {
                console.log("Inserted Key", temp.ID);
                });
            })
    res.send('News Added');})
        
app.listen(port, () => console.log(`Example app listening on port ${port}!`));