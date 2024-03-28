import { cache } from './Cache.js'
import { CurrentUser, SessionBag } from './session.js';

export const send = async (eType, message) => {
    try {
        CurrentUser.session.send(new SessionBag(eType, message));
    } catch (err) {
        return
    }
    cache.msgCache.Set(message.campID, message.content)
    return
}