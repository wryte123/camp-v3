class DefaultCache {
    constructor() {
        this.cache = new Map();
    }

    set(key, value) {
        this.cache.set(key, value);
    }

    get(key) {
        return this.cache.get(key);
    }

    has(key) {
        return this.cache.has(key);
    }
    delete(key) {
        return this.cache.delete(key);
    }
}

class SafeCache {
    constructor() {
        this.data = {};
        this.loadFromLocalStorage();
        window.addEventListener('beforeunload', () => {
            this.saveToLocalStorage();
        });
    }

    set(key, value) {
        this.data[key] = value;
    }

    get(key) {
        return this.data[key];
    }

    saveToLocalStorage() {
        localStorage.setItem('cache', JSON.stringify(this.data));
    }

    loadFromLocalStorage() {
        const cachedData = localStorage.getItem('cache');
        if (cachedData) {
            this.data = JSON.parse(cachedData);
        }
    }
}

class Cache {
    constructor() {
        this.userCache = new SafeCache();
        this.campCache = new DefaultCache();
        this.projCache = new DefaultCache();
        this.msgCache = new DefaultCache();
    }

    users() {
        return this.userCache;
    }

    camps() {
        return this.campCache;
    }

    projects() {
        return this.projCache;
    }

    messages() {
        return this.msgCache;
    }

    static getInstance() {
        if (!Cache.instance) {
            Cache.instance = new Cache();
        }
        return Cache.instance;
    }
}


export const cache = Cache.getInstance();


