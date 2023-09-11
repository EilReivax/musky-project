class Task {
    constructor(id, title, description, dueDate, priority, users) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = new Date(dueDate);
        this.priority = priority;
        this.users = users;
    }

    // Getters
    get id () {
        return this._id
    }

    get title () {
        return this._title
    }

    get description () {
        return this._description
    }

    get dueDate () {
        return this._dueDate
    }

    get priority () {
        return this._priority
    }

    get users () {
        return this._users
    }

    // Setters
    set id (id) {
        this._id = id;
    }

    set title (title) {
        this._title = title;
    }

    set description (description) {
        this._description = description;
    }

    set dueDate (dueDate) {
        this._dueDate = dueDate;
    }

    set priority (priority) {
        this._priority = priority;
    }

    set users (users) {
        this._users = users;
    }
}

module.exports = Task;