const cluster=require('cluster')
const os=require('os');
const express=require('express');
const compression = require('compression');
const morgan = require('morgan');
const helmet = require('helmet');
if(cluster.isPrimary){
    const core=os.cpus().length;
    console.log("no of cpu",core);

    for(let i=0;i<core;i++){
        cluster.fork();
    }
    cluster.on('exit',(worker,code,signal)=>{
        cluster.fork();
    })
}else{
    const app=express();

    app.use(helmet());
    app.use(compression());
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));
    app.use(morgan('combined'));
    const cache=new Map();

    app.get('/data',async(req,res)=>{
        const key='important';
        //if hit;
        if(cache.has(key)){
            console.log('cache hitted');
            return res.json(cache.get(key));
        }
        //if miss;
        const data=await performOperation();
        cache.set(key,data);
        res.json(data);
    })
    async function performOperation() {
        return new Promise((resolve) =>
          setTimeout(() => resolve({ message: 'New Data generated', time: new Date() }), 2000)
        );
      }
    
    app.get('/', (req, res) => res.send('Hello Team Vdev!'));
    const PORT = process.env.PORT || 3000;
    app.listen(PORT,()=>{
        console.log("server listening....");
    })
}