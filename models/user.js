class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    // Getters
    get username() {
        return this._username;
    }

    get password() {
        return this._password;
    }
    
    // Setters
    set username (username) {
        this._username = username;
    }

    set password (password) {
        this._password = password;
    }
}

module.exports = User;