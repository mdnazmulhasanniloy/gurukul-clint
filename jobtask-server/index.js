const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config();



const app = express();
const port = process.env.PORT || 2000;


app.use(cors());
app.use(express.json());



//db connect 


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.pyj8wdj.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })



const run = async () => {
    try {

        //db table 
        const questionsCollection = client.db(`${process.env.DB_USER}`).collection('questions');
 

        app.post('/questions', async(req, res)=>{
            const data = req.body;
            console.log(data)
            const result = await questionsCollection.insertMany(data);
            res.send(result);
        })





    }
    finally {

    }
}
run().catch(console.dir);





app.get('/', (req, res) => {
    res.send('simple Gurukul server is running');
});



app.listen(port, () => {
    console.log(`simple Gurukul server running on prot ${port}`);
})