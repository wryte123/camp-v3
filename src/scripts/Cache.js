import { MessageAPI } from "./api";

class MsgCache {
    constructor() {
        this.cache = new Map();

        eventBus.subscribe('message', (message) => {
            this.push(message.campID, message);
        });
    }

    set(campID, messages) {
        if (!this.cache.has(campID)) {
            this.cache.set(campID, {
                messages: [],
            });
        }

        const record = this.cache.get(campID);
        record.messages = messages.sort((a, b) => a.timestamp - b.timestamp);
        this.cache.set(campID, record);
    }

    prepend(campID, message) {
        if (!this.cache.has(campID)) {
            this.cache.set(campID, {
                messages: [],
            });
        }

        const record = this.cache.get(campID);
        record.messages.unshift(message);
        this.cache.set(campID, record);
    }

    push(campID, message) {
        if (!this.cache.has(campID)) {
            this.cache.set(campID, {
                messages: [],
            });
        }

        const record = this.cache.get(campID);
        record.messages.push(message);
        this.cache.set(campID, record);
    }

    get(campID) {
        return this.cache.get(campID)?.messages || [];
    }

    has(campID) {
        return this.cache.has(campID);
    }

    delete(campID) {
        return this.cache.delete(campID);
    }

    fetchMessages(campID) {
        let messages = [];
        MessageAPI.getMessageRecord(campID)
    }

    static getInstance() {
        if (!MsgCache.instance) {
            MsgCache.instance = new MsgCache();
        }
        return MsgCache.instance;
    }
}

export const cache = MsgCache.getInstance();
