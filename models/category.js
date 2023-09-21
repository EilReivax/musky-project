class Category {
    constructor(id, title) {
        this.id = id;
        this.title = title;
    }

    // Getters
    get id() {
        return this._id;
    }

    get title() {
        return this._title;
    }

    // Setters
    set id(id) {
        this._id = id;
    }
    
    set title(title) {
        this._title = title;
    }
}

module.exports = Category;