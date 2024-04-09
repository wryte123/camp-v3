import { CurrentUser } from "./session";

export function formatDateFromISO(isoDateString) {
    const date = new Date(isoDateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}年${month}月${day}日`;
}

export function formatTimeFromISO(isoDateString) {
    const date = new Date(isoDateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}年${month}月${day}日 ${hours}:${minutes}:${seconds}`;
}

export function sortMembers(members, ownerID) {
    if (!members) return;
    members.sort((a, b) => {
        if (!a.title && b.title) return 1;
        if (a.title && !b.title) return -1;

        if (a.userID === CurrentUser.id) return -1;
        if (b.userID === CurrentUser.id) return 1;

        if (a.userID === ownerID) return -1;
        if (b.userID === ownerID) return 1;

        return 0;
    });
}

export function isDigit(str) {
    return /^\d+$/.test(str);
}