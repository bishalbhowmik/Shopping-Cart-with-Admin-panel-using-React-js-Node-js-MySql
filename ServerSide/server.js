import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import multer from 'multer'
import path from 'path'

const app = express();
app.use(cors(
    {
        origin: ["http://localhost:3000"],
        methods: ["POST", "GET", "PUT", "DELETE"],
        credentials: true
    }
));
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup"
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({
    storage: storage
})

con.connect(function (err) {
    if (err) {
        console.log("Error in Connection");
    } else {
        console.log("Connected");
    }
})

app.get('/getEmployee', (req, res) => {
    const sql = "SELECT * FROM customers";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Error: "Get employee error in sql" });
        return res.json({ Status: "Success", Result: result })
    })
})

app.get('/getProduct', (req, res) => {
    const sql = "SELECT * FROM product";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Error: "Get Product error in sql" });
        return res.json({ Status: "Success", Result: result })
    })
})

app.get('/get/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM customers where id = ?";
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Error: "Get employee error in sql" });
        return res.json({ Status: "Success", Result: result })
    })
})

app.get('/getP/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM product where id = ?";
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Error: "Get employee error in sql" });
        return res.json({ Status: "Success", Result: result })
    })
})

app.get('/userProduct', (req, res) => {
    const sql = 'SELECT * FROM product';

    con.query(sql, (err, result) => {
        if (err) return res.json({ Error: 'Error in query' })
        return res.json({ Status: 'Success', Result: result });
    })
})

app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const sql = "UPDATE customers set name = ?, email = ?, address = ? WHERE id = ?";
    con.query(sql, [req.body.name, req.body.email, req.body.address, id], (err, result) => {
        if (err) return res.json({ Error: "update employee error in sql" });
        return res.json({ Status: "Success" })
    })
})

app.put('/updateProduct/:id', (req, res) => {
    const id = req.params.id;
    const sql = "UPDATE product set name = ?, price = ?, size = ? WHERE id = ?";
    con.query(sql, [req.body.name, req.body.price, req.body.size, id], (err, result) => {
        if (err) return res.json({ Error: "update employee error in sql" });
        return res.json({ Status: "Success" })
    })
})

app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    const sql = "Delete FROM customers WHERE id = ?";
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Error: "delete employee error in sql" });
        return res.json({ Status: "Success" })
    })
})

app.delete('/deleteProduct/:id', (req, res) => {
    const id = req.params.id;
    const sql = "Delete FROM product WHERE id = ?";
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Error: "delete employee error in sql" });
        return res.json({ Status: "Success" })
    })
})

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ Error: "You are no Authenticated" });
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) return res.json({ Error: "Token wrong" });
            req.role = decoded.role;
            req.id = decoded.id;
            next();
        })
    }
}

app.get('/dashboard', verifyUser, (req, res) => {
    return res.json({ Status: "Success", role: req.role, id: req.id })
})

app.get('/shopping', verifyUser, (req, res) => {
    return res.json({ Status: "Success", role: req.role, id: req.id })
})

app.get('/adminCount', (req, res) => {
    const sql = "Select count(id) as admin from users";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Error: "Error in runnig query" });
        return res.json(result);
    })
})
app.get('/employeeCount', (req, res) => {
    const sql = "Select count(id) as customers from customers";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Error: "Error in runnig query" });
        return res.json(result);
    })
})

app.get('/productCount', (req, res) => {
    const sql = "Select count(id) as product from product";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Error: "Error in runnig query" });
        return res.json(result);
    })
})

// app.get('/salary', (req, res) => {
//     const sql = "Select sum(salary) as sumOfSalary from employee";
//     con.query(sql, (err, result) => {
//         if (err) return res.json({ Error: "Error in runnig query" });
//         return res.json(result);
//     })
// })

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM users Where email = ? AND  password = ?";
    con.query(sql, [req.body.email, req.body.password], (err, result) => {

        if (err) return res.json({ Status: "Error", Error: "Error in running query" });
        if (result.length > 0) {
            const id = result[0].id;
            const token = jwt.sign({ role: "admin" }, "jwt-secret-key", { expiresIn: '1d' });
            res.cookie('token', token);
            return res.json({ Status: "Success" })
        } else {
            return res.json({ Status: "Error", Error: "Wrong Email or Password" });
        }
    })
})


app.post('/employeelogin', (req, res) => {
    const sql = "SELECT * FROM customers Where email = ?";
    con.query(sql, [req.body.email], (err, result) => {
        if (err) return res.json({ Status: "Error", Error: "Error in running query" });
        console.log(req.body.password.toString());
        console.log(result[0].password);
        if (result.length > 0) {

            if (req.body.password.toString() === result[0].password) {
                const token = jwt.sign({ role: "employee", id: result[0].id }, "jwt-secret-key", { expiresIn: '1d' });
                res.cookie('token', token);
                return res.json({ Status: "Success", id: result[0].id })
            } else {
                return res.json({ Status: "Error", Error: "Not correct Email or Password" });
            }



        } else {
            return res.json({ Status: "Error", Error: "Email or Password" });
        }
    })
})



// app.get('/employee/:id', (req, res) => {
//     const id = req.params.id;
//     const sql = "SELECT * FROM employee where id = ?";
//     con.query(sql, [id], (err, result) => {
//         if(err) return res.json({Error: "Get employee error in sql"});
//         return res.json({Status: "Success", Result: result})
//     })
// })




app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: "Success" });
})

app.post('/adminCreate', (req, res) => {
    const sql = 'INSERT INTO users (`Email`,`Password`) VALUES (?)';

    const values = [
        req.body.email,
        req.body.password
    ]

    console.log(values);

    con.query(sql, [values], (err, result) => {
        if (err) return res.json({ Error: 'Error in query' })

        return res.json({ Status: 'Success' });
    })
})

app.post('/create', upload.single('image'), (req, res) => {

    const sql2 = 'SELECT * from customers where email =?';

    const newEmail = req.body.email;
    console.log('New Email:' + typeof(newEmail)+newEmail);

    con.query(sql2,[newEmail], (err, result) => {

        if(err) return res.json({Error: 'Error in Query'});

        if (result.length===0) {
            const sql = "INSERT INTO customers (`name`,`email`,`password`, `address`,`image`) VALUES (?)";

            const values = [
                req.body.name,
                req.body.email,
                req.body.password,
                req.body.address,
                
                req.file.filename
            ]
            con.query(sql, [values], (err, result) => {
                if (err) return res.json({ Error: "Inside singup query" });
                
            })
            return res.json({Status:'Success'})
           
        }
        else{
            return res.json({Status: 'Email Already used'});
        }

        // return res.json({Message: 'Query ok'})


    })

})


app.post('/addproduct', upload.single('image'), (req, res) => {
    const sql = "INSERT INTO product (`name`,`price`,`size`, `image`) VALUES (?)";

    const values = [
        req.body.name,
        req.body.price,
        req.body.size,
        req.file.filename
    ]
    con.query(sql, [values], (err, result) => {
        if (err) return res.json({ Error: "Inside singup query" });
        return res.json({ Status: "Success" });
    })

})

app.listen(8081, () => {
    console.log("Running");
})
