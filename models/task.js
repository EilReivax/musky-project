class Task {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = new Date(dueDate);
        this.priority = parseInt(priority);
        this.progress = 0;
    }

    // Getters
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
    
    get progress () {
        return this._progress
    }

    // Setters
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

    set progress (progress) {
        this._progress = progress;
    }
}

module.exports = Task;