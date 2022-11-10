require('dotenv').config()
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;




//serviceReview
//services

//middle ware

app.use(cors());
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.b9snwll.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



// const verifyJWT = (req, res, next) => {
//     const authHeader = req.headers.authorization;
//     console.log("sads", authHeader)
//     if (!authHeader) {
//         return res.status(401).send({ message: 'unauthorized user' });
//     }

//     const token = authHeader.split(' ')[1];
//     jwt.verify(token, process.env.SECRET, function (err, decoded) {
//         if (err) {
//             return res.status(403).send({ message: 'unauthorized user' })
//         }
//         req.decoded = decoded;
//         next();
//     })

// }






async function run() {

    const serviceCollection = client.db('serviceReview').collection('services');
    const reviewCollection = client.db('serviceReview').collection('review')

    try {

        // jwt token

        // app.post('/jwt', (req, res) => {
        //     const user = req.body;
        //     // const token = jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: '1d' })
        //     console.log(user);
        //     const token = jwt.sign(user, process.env.SECRET, { expiresIn: '1d' })
        //     res.send({ token })

        // })

        //get 3 the data
        app.get('/servicesThree', async (req, res) => {
            const size = parseInt(3)
            // console.log(size);
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.limit(size).toArray();
            res.send(services);
        })

        //get 3 the data
        app.get('/services', async (req, res) => {
            const size = parseInt(3)
            // console.log(size);
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        })

        //get specific id data

        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const service = await serviceCollection.findOne(query);
            res.send(service);
        })


        app.post('/services', async (req, res) => {
            const user = req.body;
            console.log("dsd", user);
            const result = await serviceCollection.insertOne(user);
            res.send(result);
        })



        //review api

        //entry review data in db
        app.post('/reviews', async (req, res) => {
            const review = req.body;
            const result = await reviewCollection.insertOne(review);
            res.send(result);
        })

        //get mane onnek gula user ase kin2 amr website e jei email diye login kora ase shudhu tar e review list dekhabe.

        app.get('/reviews', async (req, res) => {
            // console.log(req.header);
            // const decoded = req.decoded;
            // if (decoded.email !== req.query.email) {
            //     return res.status(403).send({ message: 'cant access' })
            // }
            // let query = {}
            if (req.query.email) {
                console.log(req.query.email);
                query = {
                    email: req.query.email
                }
            }

            const cursor = reviewCollection.find(query);
            const review = await cursor.toArray();
            res.send(review)
        })


        app.get('/reviews/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const user = await reviewCollection.findOne(query);
            res.send(user)
        })

        //get mane onnek gula service ase kin2 ami jei service e dhukbo oi service er jnish potro dekhane


        app.get('/reviewspecific', async (req, res) => {

            // const decoded = req.decoded;
            // console.log('inside orders', decoded);
            // if (decoded.email !== req.query.email) {
            //     return res.status(403).send({ message: 'cant access' })
            // }


            // let query = {};
            if (req.query.service) {
                console.log(req.query.service);
                query = {
                    service: req.query.service
                }
            }
            const cursor = reviewCollection.find(query);
            const review = await cursor.toArray();
            res.send(review)
        })


        //eita holo rewiew add korar jonnoo
        app.post('/reviewspecific', async (req, res) => {
            const review = req.body;
            const result = await reviewCollection.insertOne(review);
            res.send(result);
        })



        app.delete('/reviews/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await reviewCollection.deleteOne(query);
            res.send(result);
        })

        //update specific data of review

        app.put('/reviews/:id', async (req, res) => {
            const id = req.params.id;
            const user = req.body;
            const query = { _id: ObjectId(id) };
            const updateDoc = {
                $set: {
                    service_title: user.service_title,
                    email: user.email,
                    user: user.user,
                    review: user.review,
                    dateAdded: new Date()
                }
            }
            const result = await reviewCollection.updateOne(query, updateDoc);
            res.send(result);




            // const review = req.body;
            // const result = await reviewCollection.insertOne(review);
            // res.send(result);





        })
        // app.put('/review', async (req, res) => {
        //     // const id = req.params.id;
        //     const user = req.body;
        //     // const query = { _id: ObjectId(id) };
        //     const updateDoc = {

        //         // { upsert: true }
        //     }
        //     const result = await reviewCollection.updateOne(

        //         {
        //             $set: {
        //                 service_title: user.service_title,
        //                 email: user.email,
        //                 user: user.user,
        //                 review: user.review
        //             },
        //             $setOnInsert: { dateAdded: new Date() },

        //         },

        //         { upsert: true }

        //     );
        //     res.send(result);
        // })




    }
    finally {

    }
}

run().catch(err => console.log(err))


app.get('/', (req, res) => {
    res.send("service review running")
});

app.listen(port, () => {
    console.log('server running')
})





