class User {
    constructor(username, password, firstName, lastName, dateOfBirth, phoneNumber, address) {
        this.username = username;
        this.email = username + "@musky.com.au";
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth
        this.phoneNumber = phoneNumber;
        this.address = address;
    }

    // Getters
    get username() {
        return this._username;
    }

    get email() {
        return this._email;
    }
    
    get password() {
        return this._password;
    }

    get firstName() {
        return this._firstName;
    }

    get lastName() {
        return this._lastName;
    }

    get dateOfBirth() {
        return this._dateOfBirth;
    }

    get phoneNumber() {
        return this._phoneNumber;
    }

    get address() {
        return this._address;
    }

    // Setters
    set username(username) {
        this._username = username;
        this._email = username + "@musky.com.au";
    }

    set password(password) {
        this._password = password;
    }

    set firstName(firstName) {
        this._firstName = firstName;
    }

    set lastName(lastName) {
        this._lastName = lastName;
    }

    set dateOfBirth(dateOfBirth) {
        this._dateOfBirth = dateOfBirth;
    }

    set phoneNumber(phoneNumber) {
        this._phoneNumber = phoneNumber;
    }

    set address(address) {
        this._address = address;
    }

    // Methods
    getFullName() {
        return this._firstName + " " + this._lastName;
    }

    getDateOfBirth() {
        return this._dateOfBirth.toLocaleDateString();
    }
}