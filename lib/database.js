import { resolve, dirname as _dirname } from 'path';
import _fs, { existsSync, readFileSync } from 'fs';
const { promises: fs } = _fs;

class Database {
    /**
     * Create new Database
     * @param {String} filepath Path to specified JSON database
     * @param  {...any} args JSON.stringify arguments
     */
    constructor(filepath, ...args) {
        this.file = resolve(filepath);
        this.logger = console;
        this._load();
        this._jsonargs = args;
        this._state = false;
        this._queue = [];

        // Use a timeout instead of interval for better efficiency
        this._processQueue();
    }

    get data() {
        return this._data;
    }

    set data(value) {
        this._data = value;
        this.save();
    }

    /**
     * Queue Load
     */
    load() {
        this._queue.push('_load');
        this._processQueue(); // Process immediately after adding to queue
    }

    /**
     * Queue Save
     */
    save() {
        this._queue.push('_save');
        this._processQueue(); // Process immediately after adding to queue
    }

    async _processQueue() {
        if (this._state || !this._queue.length) return;

        this._state = true;
        const method = this._queue.shift();

        try {
            await this[method]();
        } catch (error) {
            this.logger.error(`Error processing ${method}: ${error.message}`);
        } finally {
            this._state = false;
            // Continue processing the queue
            this._processQueue();
        }
    }

    /**
     * Load data from the JSON file
     */
    _load() {
        try {
            this._data = existsSync(this.file) ? JSON.parse(readFileSync(this.file)) : {};
        } catch (error) {
            this.logger.error(`Failed to load data: ${error.message}`);
            this._data = {}; // Default to empty object on error
        }
    }

    /**
     * Save data to the JSON file
     */
    async _save() {
        try {
            const dirname = _dirname(this.file);
            if (!existsSync(dirname)) await fs.mkdir(dirname, { recursive: true });
            await fs.writeFile(this.file, JSON.stringify(this._data, ...this._jsonargs));
            this.logger.info(`Data saved to ${this.file}`);
            return this.file;
        } catch (error) {
            this.logger.error(`Failed to save data: ${error.message}`);
            throw new Error('Save operation failed'); // Throw error for better handling
        }
    }

    /**
     * Delete a key from the database
     * @param {String} key The key to be deleted
     */
    delete(key) {
        if (this._data[key]) {
            delete this._data[key];
            this.save();
        } else {
            this.logger.warn(`Key "${key}" not found in data.`);
        }
    }
}

export default Database;
