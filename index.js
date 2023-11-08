const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')
const app = express()
const port = process.env.PORT || 5000


app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.g0ipecx.mongodb.net/?retryWrites=true&w=majority`;






// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


const logger = async (req, res, next) => {
    console.log("called:", req.hostve)


    next()

}

const verifyToken = async (req, res, next) => {
    const token = req.cookies?.token;
    console.log(token);
    if (!token) {
        return res.status(403).send({ message: "not authorized" })
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            console.log(err);
            return res.status(401).send({ message: "unauthorized" })
        }
        req.user = decoded
        console.log(decoded);
        next()
    })


}





async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)

        // Send a ping to confirm a successful connection

        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        const AddassignmentCollaction = client.db("GroupStudy").collection('Addassignment')
        const SubmitassignmentCollaction = client.db("GroupStudy").collection('SubmitAssignment')

        // const BillsCollaction = client.db("AyenTraders").collection('bills')




        app.post("/jwt", logger, async (req, res) => {
            const user = req.body;
            console.log(user);
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" })


            res.cookie("token",token,{
                httpOnly: true,
                secure: false,
                
            })

            // res
            //     .cookie('token', token, {
            //         httpOnly: true,
            //         secure: process.env.NODE_ENV === 'production',
            //         sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            //     })


                .send({ success: true })



        })
           








    app.post('/logout', async (req, res) => {
        const user = req.body
        console.log('loginoutUser:', user);
        res.clearCookie('token', { maxAge: 0 }).send({ success: true })
    })

    app.get("/addassignmentCount", async (req, res) => {
        const Count = await AddassignmentCollaction.estimatedDocumentCount()

        res.send({ Count })
    })








    app.post('/addassignment', logger, async (req, res) => {


        const addProduct = req.body
        console.log(addProduct);
        const result = await AddassignmentCollaction.insertOne(addProduct)
        res.send(result)
        console.log(result);
    })

    app.get('/submitemail', logger, verifyToken, async (req, res) => {
        // console.log(req.query.email);
        console.log("token", req.cookies.token);
        console.log(req.query, req.user);

        if (req.query?.email !== req.user?.email) {
            return res.status(403).send({ message: 'forvbidden access' })
        }


        let query = {}
        if (req.query?.email) {
            query = { email: req.query.email }
        }
        const result = await SubmitassignmentCollaction.find(query).toArray()
        res.send(result)
    })


    app.get('/easy,', logger, async (req, res) => {
        // console.log(req.query.Status);
        let query = {}
        if (req.query?.AssignmentDifficulty) {
            query = { AssignmentDifficulty: req.query.AssignmentDifficulty }
        }
        const result = await AddassignmentCollaction.find(query).toArray()
        res.send(result)
    })

    app.get('/medium', logger, async (req, res) => {
        // console.log(req.query.Status);
        let query = {}
        if (req.query?.AssignmentDifficulty) {
            query = { AssignmentDifficulty: req.query.AssignmentDifficulty }
        }
        const result = await AddassignmentCollaction.find(query).toArray()
        res.send(result)
    })

    app.get('/hard', logger, async (req, res) => {
        // console.log(req.query.Status);
        let query = {}
        if (req.query?.AssignmentDifficulty) {
            query = { AssignmentDifficulty: req.query.AssignmentDifficulty }
        }
        const result = await AddassignmentCollaction.find(query).toArray()
        res.send(result)
    })





    app.get('/addassignment', logger, async (req, res) => {
        const page = parseInt(req.query.page)
        const size = parseInt(req.query.size)

        console.log("page", page, size)
        const cursor = AddassignmentCollaction.find()
        const result = await cursor
            .skip(page * size)
            .limit(size)
            .toArray()


        res.send(result)
    })

    app.get('/addassignment/:id', logger, async (req, res) => {
        const id = req.params.id
        const query = { _id: new ObjectId(id) }
        const result = await AddassignmentCollaction.findOne(query)
        res.send(result)

    })



    app.post('/submit', logger, async (req, res) => {
        const addProduct = req.body
        console.log(addProduct);
        const result = await SubmitassignmentCollaction.insertOne(addProduct)
        res.send(result)
        console.log(result);
    })

    app.get('/submit', logger, async (req, res) => {
        const cursor = SubmitassignmentCollaction.find()
        const result = await cursor.toArray()
        res.send(result)
    })

    app.get('/submit/:id', logger, async (req, res) => {
        const id = req.params.id
        const query = { _id: new ObjectId(id) }
        const result = await SubmitassignmentCollaction.findOne(query)
        res.send(result)

    })

    app.get('/submitstatus', logger, async (req, res) => {
        // console.log(req.query.Status);
        let query = {}
        if (req.query?.Status) {
            query = { Status: req.query.Status }
        }
        const result = await SubmitassignmentCollaction.find(query).toArray()
        res.send(result)
    })
    app.get('/submitstatus', logger, async (req, res) => {
        // console.log(req.query.Status);
        let query = {}
        if (req.query?.Status) {
            query = { Status: req.query.Status }
        }
        const result = await SubmitassignmentCollaction.find(query).toArray()
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
    


    app.delete('/addassignment/:id', logger, async (req, res) => {
        const id = req.params.id
        const query = { _id: new ObjectId(id) }
        const result = await AddassignmentCollaction.deleteOne(query)
        res.send(result)
    })

    // // post opciton



    // // // update opction

    app.put('/addassignment/:id', logger, async (req, res) => {
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
    app.put('/submit/:id', logger, async (req, res) => {
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
                Status: UpdateProduct.Status,
                Mark: UpdateProduct.Mark,
                Feedback: UpdateProduct.Feedback,
                pdfLink: UpdateProduct.pdfLink,
                QuickNote:UpdateProduct.QuickNote,

            }



        }
        const result = await SubmitassignmentCollaction.updateOne(filter, Updates, options)
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