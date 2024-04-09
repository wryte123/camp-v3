import { MessageAPI } from "./api";
import { eventBus } from "./EventBus";

class MsgCache {
    constructor() {
        this.cache = new Map();

        eventBus.subscribe('message', (message) => {
            this.push(message.campID, message);
        });
    }

    set(campID, messages) {
        this.cache.set(campID, messages);
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

    async get(campID) {
        if (!this.cache.has(campID)) {
            await this.fetchMessages(campID, 0);
        }
        return this.cache.get(campID) || [];
    }

    has(campID) {
        return this.cache.has(campID);
    }

    delete(campID) {
        return this.cache.delete(campID);
    }

    async fetchMessages(campID, begin) {
        try {
            const response = await MessageAPI.getMessageRecord(campID, begin);
            console.log(response);
            const messages = response.data.msgs || [];

            this.cache.set(campID, messages);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    }


    static getInstance() {
        if (!MsgCache.instance) {
            MsgCache.instance = new MsgCache();
        }
        return MsgCache.instance;
    }
}

export const cache = MsgCache.getInstance();
