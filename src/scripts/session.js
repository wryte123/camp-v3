import { eventBus } from './EventBus.js';
import { reactive } from "vue";

const saveUserInfoToLocal = (userInfo) => {
    localStorage.setItem("currentUser", JSON.stringify(userInfo));
}

const restoreUserInfoFromLocal = () => {
    const userInfoString = localStorage.getItem("currentUser");
    if (userInfoString) {
        return JSON.parse(userInfoString);
    }
    return null;
}

export const CurrentUser = reactive(restoreUserInfoFromLocal() || {
    id: 0,
    username: "",
    email: "",
    token: "",
    session: null,
    logined: false,
});

export const logout = () => {
    localStorage.removeItem("currentUser");
    CurrentUser.logined = false;
}


export const userInit = (id, username, avatar, token) => {
    CurrentUser.id = id;
    CurrentUser.username = username;
    CurrentUser.avatar = avatar;
    CurrentUser.token = token;
    CurrentUser.session = new Session(token);
    CurrentUser.logined = true;
    console.log("user initialized", CurrentUser);


    saveUserInfoToLocal(CurrentUser);
}

export const initWebSocket = () => {
    if (CurrentUser.token) {
        CurrentUser.session = new Session(CurrentUser.token);
    }
}

class Session {
    constructor(token) {
        this.token = token;
        this.websocket = new WebSocket(`ws://8.134.104.253:8080/ws?token=${this.token}`);
        this.websocket.onopen = () => this.onOpen();
        this.websocket.onclose = () => this.onClose();
        this.websocket.onmessage = (event) => this.onMessage(event);
    }

    onOpen() {
        console.log("session opened");
        this.heartbeatInterval = setInterval(() => {
            if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
                this.websocket.send(JSON.stringify({
                    timestamp: (new Date()).toISOString(),
                    eType: EventTypes().PingEvent
                }));
            }
        }, 100000);
    }

    onClose() {
        console.log("session closed");
        clearInterval(this.heartbeatInterval);
        this.reconnect();
    }

    onMessage(event) {
        console.log(`Session: ${event}`);
        if (event.data) {
            eventBus.Publish("message", JSON.parse(event.data));
        }
    }

    send(data) {
        this.websocket.send(JSON.stringify(RegularMessage(data)));
    }

    reconnect() {
        let count = 9;
        let retryCount = 0;

        const tryConnect = () => {
            if (retryCount >= count) {
                eventBus.Publish("disconnected");
                return;
            }

            if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
                return;
            }

            retryCount++;
            this.websocket = new WebSocket(`ws://8.134.104.253:8080/ws?token=${this.token}`);
            setTimeout(tryConnect, 5000);
        };

        tryConnect();
    }

    close() {
        if (this.websocket) {
            this.websocket.close();
        }
    }
}


const RegularMessage = (data) => {
    return {
        userID: CurrentUser.id,
        timestamp: (new Date()).toISOString(),
        eType: data.eType,
        data: data,
    }
}

export const EventTypes = () => {
    return {
        UnknownEvent: 0,
        PingEvent: 1,
        TextMessageEvent: 2,
        BinaryMessageEvent: 3,
        CodeGraphMessageEvent: 4,
        MarkdownMessageEvent: 5,
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