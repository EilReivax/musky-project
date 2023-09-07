class User {
    constructor(username) {
        this.id = generateId();
        this.username = username;
    }

    get id() {
        return this._id;
    }

    get username() {
        return this._username;
    }
    
    set id (newId) {
        this._id = newId;
    }

    set username (newUsername) {
        this._username = newUsername;
    }
}

function generateId() {
    return Math.round(Math.random()*1000);
}

module.exports = User;