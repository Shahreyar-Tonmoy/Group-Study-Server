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
       
        // Send a ping to confirm a successful connection
       
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        const AddassignmentCollaction = client.db("GroupStudy").collection('Addassignment')
        const SubmitassignmentCollaction = client.db("GroupStudy").collection('SubmitAssignment')
        
        // const BillsCollaction = client.db("AyenTraders").collection('bills')


        app.post('/addassignment' , async (req, res) => {
            const addProduct = req.body
            console.log(addProduct);
            const result = await AddassignmentCollaction.insertOne(addProduct)
            res.send(result)
            console.log(result);
        })
        app.post('/submit' , async (req, res) => {
            const addProduct = req.body
            console.log(addProduct);
            const result = await SubmitassignmentCollaction.insertOne(addProduct)
            res.send(result)
            console.log(result);
        })

        app.get('/addassignment', async (req, res) => {
            const cursor = AddassignmentCollaction.find()
            const result = await cursor.toArray()
            res.send(result)
        })
        app.get('/submit', async (req, res) => {
            const cursor = SubmitassignmentCollaction.find()
            const result = await cursor.toArray()
            res.send(result)
        })
        
        app.get('/addassignment/:id' , async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const result = await AddassignmentCollaction.findOne(query)
            res.send(result)

        })
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

        app.put('/addassignment/:id' , async (req, res) => {
            const id = req.params.id
            const filter = { _id: new ObjectId(id) }
            const options = { upsert: true }
            const UpdateProduct = req.body
            const Updates = {
                $set: {
                   
                    Title: UpdateProduct.Title,
                    AssignmentDifficulty: UpdateProduct.AssignmentDifficulty,
                    Marks: UpdateProduct.Marks,
                    Description: UpdateProduct.Description,
                    Date: UpdateProduct.Date,
                    email: UpdateProduct.email,
                    ImageURL: UpdateProduct.ImageURL,
                    
                }
            }
            const result = await AddassignmentCollaction.updateOne(filter, Updates, options)
            res.send(result)
        })

     
        

    

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