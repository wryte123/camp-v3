import { postData, getData } from "./Requests"




export const LoginAPI = {
    async login(data) {
        return postData("/login", data)
    },
    async register(data) {
        return postData("/reg", data)
    }
}

export const UserAPI = {
    async userInfo(userID, data) {
        return getData(`/user/${userID}`, data)
    },
    async findUsersByName(data) {
        return getData("/user/search", data)
    },
    async privateCamps(data) {
        return getData("/user/camps/private", data);
    },
    async publicCamps(data) {
        return getData("/user/camps", data);
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
    async changePassword(data) {
        return postData("/user/edit/p", data);
    },
}

export const ProjectAPI = {
    async projectInfo(projectID) {
        return getData(`/project/${projectID}`, {});
    },
    async disableProject(projectID, data) {
        return postData(`/project/${projectID}/del`, data);
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
    async createTask(projectID, data) {
        return postData(`/project/${projectID}/new_task`, data);
    },
    async editTaskInfo(projectID, taskID, data) {
        return postData(`/project/${projectID}/${taskID}/edit`, data);
    },
    async deleteTask(projectID, taskID, data) {
        return postData(`/project/${projectID}/${taskID}/del`, data);
    },
    async taskInfo(projectID, taskID, data) {
        return getData(`/project/${projectID}/${taskID}`, data);
    },
    async tasks(projectID, data) {
        return getData(`/project/${projectID}/tasks`, data);
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
    }
}