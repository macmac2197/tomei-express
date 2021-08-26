import { databaseConn } from '../db.js';
import User from '../models/userModel.js';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

databaseConn.connect();

export const fetchUsers = (req, res) => {
    User.fectchAll((err, users) => {
        if(!err) {
            res.status(200).json(users);
        } else {
            res.status(404).send(err);
        }
    });
}

export const getUser = (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if(!err) {
            res.status(200).json(user);
        } else {
            res.status(404).send(err);
        }
    });
}

export const createUser = async (req, res) => {
    const { name, email, avatar, password, confirmPassword } =  req.body;
    const hashedPassword = await bcrypt.hash(password, 12);

    User.findByEmail(email, (err, users) => {
        // check if user email already exist.
        if (users.length) { 
            res.status(400).send({ message: "Email address already exist."});
        } else {
            // check if user password match
            if (password !== confirmPassword) {
                res.status(400).send({ message: "Password not match."});
            } else {
                const newUser = { id: uuidv4(), name, email, password: hashedPassword, createdAt: new Date(), avatar}

                User.createUser(newUser, (err, users) => {
                    if(!err) {
                        res.status(201).json(newUser);
                    } else {
                        res.status(500).send(err);
                    }
                });
            }
        };
    });
}

export const updateUser = async (req, res) => {
    const { name, email, avatar, password, confirmPassword } =  req.body;
    const id = req.params.id;
    const hashedPassword = await bcrypt.hash(password, 12);
    
    User.findByEmail(email, (err, users) => {
        // check if the email is my existing email
        const isUserEmail = id !== users[0]?.id;
        
        // check if user email already exist.
        if (users.length && isUserEmail) {
            res.status(400).send({ message: "Email address already exist."});
        } else {
            // check if user password match
            if (password !== confirmPassword) {
                res.status(400).send({ message: "Password not match."});
            } else {
                const user = { name, email, password: hashedPassword, createdAt: new Date(), avatar}

                User.findByIdAndUpdate(id, user, (err, user) => {
                    if(!err) {
                        res.status(201).json({ id, message: "User data updated."});
                    } else {
                        res.status(500).send(err);
                    }
                });
            }
        };
    });

}

export const deleteUser = (req, res) => {
    User.deleteUser(req.params.id, (err) => {
        if(!err) {
            res.status(200).send({ message: "User successfully deleted."});
        } else {
            res.status(404).send(err);
        }
    });
}