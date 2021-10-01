const events = require('events');

class DB extends events.EventEmitter {
    #users = [];

    select() {
        return new Promise((resolve, reject) => resolve(this.#users)) ;
    }
    insert(user) {
        return new Promise((resolve, reject) => {
            this.#users.push(user);
            resolve('Success');
        });
    }
    update(user) {
        return new Promise((resolve, reject) => {
            const index = this.#users.findIndex(u => u.id === user.id);
            if(index !== -1)
            {
                this.#users[index] = user;
                resolve('Success');
            } else {
                reject();
            }
        });
    }
    deleteUser(id) {
        return new Promise((resolve, reject) => {
            const index = this.#users.findIndex(u => u.id === id);
            console.log(this.#users);
            console.log(index);
            if (index !== -1) {
                const deletedUser = this.#users.splice(index, 1)[0];
                resolve(deletedUser);
            } else {
                reject();
            }
        });
    }
}

module.exports = new DB();