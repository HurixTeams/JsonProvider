const fs = require("fs");

function createFileIfNotExists(filePath, defaultContent = '{}') {
    try {
        if(!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, defaultContent);
        }
    } catch(error) {
        console.error(`An error occurred while creating the file ${filePath}: ${error}`)
    }
}

class Config {

    constructor(filePath) {
        createFileIfNotExists(filePath, "{}");
        this.filePath = filePath;
        this.data = {};
    }

    set(key, value) {
        this.data[key] = value;
    }

    remove(key) {
        if(this.exists(key)) {
            delete this.data[key];
        }
    }

    get(key) {
        return this.data[key];
    }

    exists(key) {
        return key in this.data;
    }

    getAll() {
        return this.data;
    }

    setNested(key, subKey, value) {
        if(!this.data[key]) {
            this.data[key] = {}
        }
        this.data[key][subKey] = value;
    }

    removeNested(key, subKey) {
        if(this.data[key] && this.data[key][subKey]) {
            delete this.data[key][subKey];
        }
    }

    load() {
        try {
            const fileData = fs.readFileSync(this.filePath, 'utf8');
            this.data = JSON.parse(fileData);
        } catch(error) {
            console.error(`Cannot load data from ${this.filePath}. Using an empty configuration.`)
        }
    }

    save() {
        const jsondata = JSON.stringify(this.data, null, 2);
        fs.writeFileSync(this.filePath, jsondata);
    }

}

module.exports = Config;