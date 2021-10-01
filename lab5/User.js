module.exports = class User {
    static count = 0;

    constructor(name, bday) {
        this.id = User.count++;
        this.name = name;
        this.bday = bday;
    }
};
