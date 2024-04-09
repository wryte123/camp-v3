import { postData, getData, fileData, getURL } from "./Requests"
import { CurrentUser } from "./session"




export const LoginAPI = {
    async login(data) {
        return postData("/login", data)
    },
    async register(data) {
        return postData("/reg", data)
    }
}

export const UserAPI = {
    async myInfo() {
        return getData(`/user/${CurrentUser.id}`, {})
    },
    async userInfo(userID) {
        return getData(`/user/${userID}`, {})
    },
    async findUsersByName(keyword) {
        return getData(`/user/search?keyword=${keyword}`, {})
    },
    async privateCamps() {
        return getData("/user/camps/private", {});
    },
    async publicCamps() {
        return getData("/user/camps", {});
    },
    async projects() {
        return getData("/user/projects", {});
    },
    async tasks() {
        return getData(`/user/tasks`, {});
    },
    async editUserInfo(data) {
        return postData("/user/edit", data);
    },
    async uploadUserAvatar(data) {
        return fileData("/user/edit/avatar", [data]);
    },
    async changePassword(data) {
        return postData("/user/edit/p", data);
    },
}

export const ProjectAPI = {
    async projectInfo(projID) {
        return getData(`/project/${projID}`, {});
    },
    async disableProject(projID) {
        return postData(`/project/${projID}/del`, {});
    },
    async publicCamps(data) {
        return getData(`/project/${data.projID}/camps`, data);
    },
    async createProject(data) {
        return postData("/project/new_proj", data);
    },
    async editProjectInfo(data) {
        return postData(`/project/${data.projID}/edit`, data);
    },
    async createCamp(data) {
        return postData(`/project/${data.projID}/new_camp`, data);
    }
};

export const TaskAPI = {
    async createTask(data) {
        return postData(`/project/${data.projID}/new_task`, data);
    },
    async editTaskInfo(data) {
        return postData(`/project/${data.projID}/tasks/${data.taskID}/edit`, data);
    },
    async deleteTask(data) {
        return postData(`/project/${data.projID}/tasks/${data.taskID}/del`, data);
    },
    async taskInfo(data) {
        return getData(`/project/${data.projID}/tasks/${data.taskID}`, data);
    },
    async tasks(projID) {
        return getData(`/project/${projID}/tasks`, {});
    }
};

export const CampAPI = {
    async campInfo(campID, data) {
        return getData(`/camp/${campID}`, data);
    },
    async editCampInfo(campID, data) {
        return postData(`/camp/${campID}/edit`, data);
    },
    async disableCamp(campID, data) {
        return postData(`/camp/${campID}/del`, data);
    },
    async inviteMember(campID, data) {
        return postData(`/camp/${campID}/members/add`, data);
    },
    async kickMember(campID, data) {
        return postData(`/camp/${campID}/members/del`, data);
    },
};

export const MessageAPI = {
    async getMessageRecord(data) {
        return getData(`/message/${data}`, data);
    }
}

export const FileAPI = {
    async uploadImg(data) {
        return getData(`/file/upload/img`, data)
    },

    async uploadFile(data) {
        return getData(`/file/upload/file`, data)
    },

    getMyAvatar() {
        return getURL(`/user/${CurrentUser.id}/avatar`);
    },

    getUserAvatar(userID) {
        return getURL(`/user/${userID}/avatar`);
    },

}

export const GitAPI = {
    async dir(projID, branch, path) {
        return getData(`/project/${projID}/workplace/${branch}/dir?path=${path}`, {})
    },

    async openFile(projID, branch, filePath) {
        return getData(`/project/${projID}/workplace/${branch}/open?path=${filePath}`, {});
    },

    async clone(projID, branch) {
        return getData(`/project/${projID}/workplace/${branch}/clone`, {});
    },

    async commit(projID, branch, data) {
        return fileData(`/project/${projID}/workplace/${branch}/commit`, data);
    },

    async createBranch(projID, branch) {
        return postData(`/project/${projID}/workplace/${branch}/create`, {});
    },

    async removeBranches(projID, branch) {
        return postData(`project/${projID}/workplace/${branch}/rm`, {})
    }
}