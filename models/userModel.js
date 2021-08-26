import { databaseConn } from '../db.js';

databaseConn.connect();

const User = (user) => {
    this.id = user.id,
    this.name = user.name,
    this.email = user.email,
    this.password = user.password,
    this.createdAt = user.createdAt, 
    this.avatar = user.avatar
};

User.fectchAll = (result) => {
    databaseConn.query('select * from users', (err, res) => {
        if (!err) {
            result(null, res);
        } else {
            result(err);
        }
    });
}

User.findByEmail = (email, result) => {
    databaseConn.query('select * from users where email = ?', [email], (err, res) => {
        if (!err) {
            result(null, res);
        } else {
            result(err);
        }
    });
}

User.findById = (id, result) => {
    databaseConn.query('select * from users where id = ?', [id], (err, res) => {
        if (!err) {
            result(null, res);
        } else {
            result(err);
        }
    });
}

User.findByIdAndUpdate = (id, user, result) => {
    databaseConn.query('update users set name = ?, email = ?, password = ?, createdAt = ?, avatar = ? where id = ?', [user.name, user.email, user.password, user.createdAt, user.avatar, id], (err, res) => {
        if (!err) {
            result(null, res);
        } else {
            result(err);
        }
    })
}

User.createUser = (newUser, result) => {
    databaseConn.query('insert into users set ?', newUser, (err, res) => {
        if (!err) {
            result(null, newUser);
        } else {
            result(err);
        }
    })
}

User.deleteUser = (id, result) => {
    databaseConn.query('delete from users where id = ?', [id], (err, res) => {
        if (!err) {
            result(null, res);
        } else {
            result(err);
        }
    });
}

export default User;