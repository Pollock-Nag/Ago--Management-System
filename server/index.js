const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require("body-parser");
const cors = require('cors');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: "agro_management_system"
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('hello world new')
})

app.post('/api/insert', (req, res) => {

    const name = req.body.name
    const address = req.body.address
    const email = req.body.email
    const NID = req.body.NID
    const phoneNumber = req.body.phoneNumber
    const password = req.body.password


    const sqlInsert = "INSERT INTO user (name,address,email,nid,phone,password) VALUES (?,?,?,?,?,?)"
    db.query(sqlInsert, [name, address, email, NID, phoneNumber, password], (err, result) => {
        res.send(result)
        //console.log(err)
    })

});

app.post('/api/getUser', (req, res) => {


    const email = req.body.email
    const NID = req.body.NID
    const password = req.body.password

    //console.log(email + "," + NID + "," + password)

    const sqlFetch = "SELECT id,name,address,email,nid,phone FROM user WHERE (email) = (?) and (nid)=(?)";

    db.query(sqlFetch, [email, NID], (err, result) => {
        //console.log(result[0].name)

        res.send(result)
    })

});



app.post('/api/getUserAdmin', (req, res) => {



    const NID = req.body.nid


    //console.log(email + "," + NID + "," + password)

    const sqlFetch = "SELECT id,name,address,email,nid,phone FROM user WHERE (nid) = (?) ";

    db.query(sqlFetch, [NID], (err, result) => {
        //console.log(result[0].name)

        res.send(result)
    })

});


app.post('/api/productInsert', (req, res) => {

    const name = req.body.name
    const details = req.body.details
    const price = req.body.price
    const count = req.body.count
    const image = req.body.image

    //console.log(name, details, price, count, image)

    const sqlInsert = "INSERT INTO product (name,details,price,count,image) VALUES (?,?,?,?,?)"
    db.query(sqlInsert, [name, details, price, count, image], (err, result) => {
        res.send(result)
        //console.log(result)
        //console.log(err)
    })

});

app.post('/api/productUpdate', (req, res) => {

    const name = req.body.name
    const details = req.body.details
    const price = req.body.price
    const count = req.body.count
    const image = req.body.image
    console.log(name, details);


    const sqlUpdate = "UPDATE product SET name = ?,details = ?, price=?, count=?, image=? WHERE name = ? ";


    db.query(sqlUpdate, [name, details, price, count, image, name], (err, result) => {
        res.send(result)

        console.log(result.affectedRows)
        //console.log(err)
    });


})


app.post('/api/productRemove', (req, res) => {

    const name = req.body.name;

    // console.log(name);


    const sqlUpdate = "DELETE From product WHERE name = ? ";


    db.query(sqlUpdate, [name], (err, result) => {
        // console.log(err)
    });


})

app.post('/api/productShowall', (req, res) => {
    const sqlShowAll = "select * from product";
    db.query(sqlShowAll, (err, result) => {
        res.send(result);
        //console.log(result);
    })


})

app.post("/api/queriesShow", (req, res) => {
    const sqlShowAll = "select * from queries";
    db.query(sqlShowAll, (err, result) => {
        res.send(result);
        //console.log(result);
    })


})

app.post("/api/queryReply", (req, res) => {
    const queryId = req.body.queryId
    const queryReply = req.body.queryReply

    //console.log(queryId, queryReply);


    const sqlUpdate = "UPDATE queries SET answer = ? WHERE id = ? ";


    db.query(sqlUpdate, [queryReply, queryId], (err, result) => {
        res.send(result)

        //console.log(result.affectedRows)
        //console.log(err)
    });


})

app.post("/api/queryQuestion", (req, res) => {
    const queryQuestion = req.body.queryQuestion
    //console.log(queryQuestion);


    const sqlInsert = "INSERT INTO queries (question) VALUES (?)"


    db.query(sqlInsert, [queryQuestion], (err, result) => {
        res.send(result)

        //console.log(result.affectedRows)
        //console.log(err)
    });


})

app.post('/api/productSearch', (req, res) => {

    const name = req.body.searchProduct
    //console.log(name)

    const sqlSearch = "select * from product where name=(?)";
    db.query(sqlSearch, [name], (err, result) => {
        res.send(result);
        //console.log(result);
    })


})

app.post("/api/addToCart", (req, res) => {
    const name = req.body.name;
    const price = req.body.price;
    const userNid = req.body.userNid;

    //console.log(name, price, userNid);


    const sqlInsert = "INSERT INTO cart (usernid,productname,productcost) VALUES (?,?,?)"


    db.query(sqlInsert, [userNid, name, price], (err, result) => {
        res.send(result)

        //console.log(result.affectedRows)
        //console.log(err)
    });


})

app.post("/api/cartShow", (req, res) => {
    const nid = req.body.nid;
    //console.log(nid)

    const sqlShowAll = "select * from cart WHERE usernid = (?) ";
    db.query(sqlShowAll, [nid], (err, result) => {
        res.send(result);
        //console.log(result);
    })


})


app.post('/api/cartRemove', (req, res) => {
    const user_id = req.body.nid;
    const id = req.body.id;

    //console.log(user_id + " " + id)


    const sqlRemove = "DELETE From cart WHERE id = ? ";


    db.query(sqlRemove, [id], (err, result) => {
        //console.log(err)
        res.send(result)
    });


})

app.post('/api/cartRemoveAll', (req, res) => {
    const user_id = req.body.nid;

    //console.log(user_id + " " + id)


    const sqlRemove = "DELETE From cart WHERE usernid = ? ";


    db.query(sqlRemove, [user_id], (err, result) => {
        //console.log(err)
        res.send(result)
    });


})


app.listen(3001, () => {
    console.log("Running on port 3001")
});
