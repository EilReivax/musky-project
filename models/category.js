class Category {
    constructor(title) {
        this.title = title;
        this.tasks = [];
    }

    // Getters
    get title() {
        return this._title;
    }

    get tasks() {
        return this._tasks;
    }

    // Setters
    set title(title) {
        this._title = title;
    }

    set tasks(tasks) {
        this._tasks = tasks;
    }

    // Methods
    addTask(task) {
        this._tasks.push(task);
    }
}

module.exports = Category;