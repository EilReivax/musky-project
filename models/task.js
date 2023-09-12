class Task {
    constructor(id, title, description, dueDate, priority, categoryId) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.progress = 0;
        this.categoryId = categoryId;
    }

    // Getters
    get id() {
        return this._id
    }
    get title() {
        return this._title
    }

    get description() {
        return this._description
    }

    get dueDate() {
        return this._dueDate
    }

    get priority() {
        return this._priority
    }
    
    get progress() {
        return this._progress
    }

    get categoryId() {
        return this._categoryId
    }

    // Setters
    set id(id) {
        this._id = id;
    }

    set title(title) {
        this._title = title;
    }

    set description(description) {
        this._description = description;
    }

    set dueDate(dueDate) {
        this._dueDate = dueDate;
    }

    set priority(priority) {
        this._priority = priority;
    }

    set progress(progress) {
        this._progress = progress;
    }

    set categoryId(categoryId) {
        this._categoryId = categoryId;
    }
}

module.exports = Task;