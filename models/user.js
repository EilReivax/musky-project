class User {
    constructor(username) {
        this.id = generateId();
        this.username = username;
    }

    get username() {
        return this.username;
    }

    set username (newUsername) {
        this._username = newUsername;
    }
}

function generateId() {
    return Math.round(Math.random()*1000);
}