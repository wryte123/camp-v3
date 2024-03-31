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
    async findUsersByName(data) {
        return getData("/user/search", data)
    },
    async privateCamps() {
        return getData("/user/camps/private", {});
    },
    async publicCamps() {
        return getData("/user/camps", {});
    },
    async projects(data) {
        return getData("/user/projects", data);
    },
    async tasks(projectID, data) {
        return getData(`/user/project/${projectID}/tasks`, data);
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
    async projectInfo(projectID) {
        return getData(`/project/${projectID}`, {});
    },
    async disableProject(projectID) {
        return postData(`/project/${projectID}/del`, {});
    },
    async publicCamps(projectID, data) {
        return getData(`/project/${projectID}/camps`, data);
    },
    async createProject(data) {
        return postData("/project/new_proj", data);
    },
    async editProjectInfo(projectID, data) {
        return postData(`/project/${projectID}/edit`, data);
    },
    async createCamp(projectID, data) {
        return postData(`/project/${projectID}/new_camp`, data);
    }
};

export const TaskAPI = {
    async createTask(data) {
        return postData(`/project/${data.projectID}/new_task`, data);
    },
    async editTaskInfo(data) {
        return postData(`/project/${data.projectID}/${data.taskID}/edit`, data);
    },
    async deleteTask(data) {
        return postData(`/project/${data.projectID}/${data.taskID}/del`, data);
    },
    async taskInfo(data) {
        return getData(`/project/${data.projectID}/${data.taskID}`, data);
    },
    async tasks(projectID) {
        return getData(`/project/${projectID}/tasks`, {});
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
    async dir(projectID, branch, path) {
        return getData(`/project/${projectID}/workplace/${branch}/dir?path=${path}`, {})
    },

    async openFile(projectID, branch, filePath) {
        return getData(`/project/${projectID}/workplace/${branch}/open?path=${filePath}`, {});
    },

    async clone(projectID, branch) {
        return getData(`/project/${projectID}/workplace/${branch}/clone`, {});
    },

    async commit(projectID, branch, data) {
        return fileData(`/project/${projectID}/workplace/${branch}/commit`, data);
    },

    async createBranch(projectID, branch) {
        return postData(`/project/${projectID}/workplace/${branch}/create`, {});
    },

    async removeBranches(projectID, branch) {
        return postData(`project/${projectID}/workplace/${branch}/rm`, {})
    }
}