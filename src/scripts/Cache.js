import { ref } from "vue";
import { MessageAPI } from "./api";
import { eventBus } from "./EventBus";
import { CurrentUser } from './session';

class MsgCache {
    constructor() {
        this.msgs = new Map();
        this.initialized = false;
        this.initializePromise = null;
        this.totalUnread = ref(0);

        eventBus.subscribe('message', (message) => {
            this.push(message.campID, message);
            if (message.ownerID != CurrentUser.id) {
                this.totalUnread.value += 1;
            }
        });
    }

    set(campID, messages) {
        this.msgs.set(campID, messages);
    }

    push(campID, messages) {
        if (!this.msgs.has(campID)) {
            this.msgs.set(campID, []);
        }
        if (!Array.isArray(messages)) {
            messages = [messages];
        }
        let record = this.get(campID);
        record.push(...messages);
    }

    get(campID) {
        return this.msgs.get(campID);
    }

    has(campID) {
        return this.msgs.has(campID);
    }

    delete(campID) {
        return this.msgs.delete(campID);
    }

    unreadSub(num) {
        this.totalUnread.value -= num;
    }

    unread() {
        return this.totalUnread;
    }

    async initialize(camps) {
        if (!this.initializePromise) {
            this.initializePromise = new Promise((resolve, reject) => {
                Promise.all(camps.map(camp => this.fetchMessages(camp, 0)))
                    .then(() => {
                        this.isInitialized = true;
                        resolve();
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        }
        return this.initializePromise
    }

    async fetchMessages(camp, begin) {
        try {
            const response = await MessageAPI.getMessageRecord(camp.id, begin);
            const messages = response.data.msgs;
            this.push(camp.id, messages);
            let unread = messages.filter(message => new Date(message.timestamp) > new Date(camp.lastRead) && message.ownerID != CurrentUser.id).length;
            this.totalUnread.value += unread;
            camp.unread = unread;
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
