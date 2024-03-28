import { eventBus } from './EventBus.js';

export class SessionBag {
    constructor(eType, data) {
        this.timestamp = Date.now();
        this.userID = CurrentUser.id;
        this.eType = eType;
        this.token = CurrentUser.token;
        this.data = data;
    }
}

export const CurrentUser = {
    id: 0,
    username: "",
    avatar: "",
    token: null,
    session: null,
    initialized: false,
}

export const userInit = (id, username, avatar, token) => {
    CurrentUser.id = id;
    CurrentUser.username = username;
    CurrentUser.avatar = avatar;
    CurrentUser.token = token;
    CurrentUser.session = new Session();
    CurrentUser.initialized = true;
}

class Session {
    constructor() {
        this.websocket = new WebSocket("ws://8.134.104.253:8080/ws");
        this.websocket.onopen = this.onOpen;
        this.websocket.onclose = this.onClose;
        this.websocket.onmessage = this.onMessage;
    }

    onOpen() {
        console.log("session opened");
        this.heartbeatInterval = setInterval(() => {
            if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
                this.websocket.send({
                    timestamp: (new Date()).toISOString(),
                    type: EventTypes.PingEvent
                });
            }
        }, 100000);
    }

    onClose() {
        console.log("session closed");
        clearInterval(this.heartbeatInterval);
        this.reconnect();
    }

    onMessage(event) {
        console.log("session: message received");
        if (event.data) {
            eventBus.Publish("message", JSON.parse(event.data));
        }
    }

    send(data) {
        this.websocket.send(RegularMessage(data));
    }

    reconnect() {
        let count = 9;
        for (let i = 0; i < count; i++) {
            if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
                break;
            }
            setTimeout(() => this.websocket = new WebSocket("ws://8.134.104.253:8080/ws"), 1000);
        }
        eventBus.Publish("disconnected");
    }

    close() {
        if (this.websocket) {
            this.websocket.close();
        }
    }
}

const RegularMessage = (data) => {
    return {
        timestamp: (new Date()).toISOString(),
        type: data.type,
        data: data,
    }
}

const EventTypes = () => {
    return {
        UnknownEvent: 0,
        AuthEvent: 1,
        PingEvent: 2,
        TextMessageEvent: 3,
        BinaryMessageEvent: 4,
        CodeGraphMessageEvent: 5,
        RequestMessageRecordEvent: 6,
        ProjectInfoChangedEvent: 7,
        NewTaskEvent: 8,
        NewAnnouncementEvent: 9,
        CampInfoChangedEvent: 10,
        CampDisableEvent: 11,
        MemberInfoChangedEvent: 12,
        MemberExitedEvent: 13,
        ProjectInvitationEvent: 14,
        CampInvitationEvent: 15
    }

};  