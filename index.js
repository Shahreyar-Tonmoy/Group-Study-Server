const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
const app = express()
const port = process.env.PORT || 5000


app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.g0ipecx.mongodb.net/?retryWrites=true&w=majority`;






// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        // const itemsCollaction = client.db("AyenTraders").collection('items')
        // const MyCartCollaction = client.db("AyenTraders").collection('mycart')
        // const BillsCollaction = client.db("AyenTraders").collection('bills')


        // app.post('/items' , async (req, res) => {
        //     const addProduct = req.body
        //     console.log(addProduct);
        //     const result = await itemsCollaction.insertOne(addProduct)
        //     res.send(result)
        //     console.log(result);
        // })

        // app.get('/items', async (req, res) => {
        //     const cursor = itemsCollaction.find()
        //     const result = await cursor.toArray()
        //     res.send(result)
        // })
        
        // app.get('/items/:id' , async (req, res) => {
        //     const id = req.params.id
        //     const query = { _id: new ObjectId(id) }
        //     const result = await itemsCollaction.findOne(query)
        //     res.send(result)

        // })
        // app.get('/mycart' , async (req, res) => {
        //     const cursor = MyCartCollaction.find()
        //     const result = await cursor.toArray()
        //     res.send(result)
        // })
        // app.post('/mycart' , async (req, res) => {
        //     const addProduct = req.body
        //     console.log(addProduct);
        //     const result = await MyCartCollaction.insertOne(addProduct)
        //     res.send(result)
        // })
        // app.get('/mycart/:id' , async (req, res) => {
        //     const id = req.params.id
        //     const query = { _id: new ObjectId(id) }
        //     const result = await MyCartCollaction.findOne(query)
        //     res.send(result)

        // })
        // app.get('/mycart/:id' , async (req, res) => {
        //     const id = req.params.id
        //     const query = { _id: new ObjectId(id) }
        //     const result = await MyCartCollaction.findOne(query)
        //     res.send(result)

        // })
        // app.post('/bills' , async (req, res) => {
        //     const addProduct = req.body
        //     console.log(addProduct);
        //     const result = await BillsCollaction.insertOne(addProduct)
        //     res.send(result)
        //     console.log(result);
        // })
        // app.get('/bills' , async (req, res) => {
        //     const cursor = BillsCollaction.find()
        //     const result = await cursor.toArray()
        //     res.send(result)
        // })
        
        
        
        // app.delete('/mycart/:id' , async (req, res)=>{
        //     const id =req.params.id
        //     const query ={ _id: new ObjectId(id) }
        //     const result = await MyCartCollaction.deleteOne(query)
        //     res.send(result)
        // })

        // // post opciton
        
        

        // // // update opction

        // app.put('/mycart/:id' , async (req, res) => {
        //     const id = req.params.id
        //     const filter = { _id: new ObjectId(id) }
        //     const options = { upsert: true }
        //     const UpdateProduct = req.body
        //     const Updates = {
        //         $set: {
        //             price: UpdateProduct.price,
                    
        //         }
        //     }
        //     const result = await MyCartCollaction.updateOne(filter, Updates, options)
        //     res.send(result)
        // })

     
        

    

    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get("/", (req, res) => {
    res.send("Group-Study  is Online")
})

app.listen(port, () => {
    console.log(`Group-Study server is running on port : ${port}`);
})