import httpService from "./http.service";
const userEndPoint = "user/";

const userService = {
    fetchAll: async () => {
        const { data } = await httpService.get(userEndPoint);
        return data;
    },
    getById: async (userId) => {
        const { data } = await httpService.get(userEndPoint + userId);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.post(userEndPoint, payload);
        return data;
    },
    update: async (payload) => {
        const { data } = await httpService.patch(
            userEndPoint + payload._id,
            payload
        );
        return data;
    },
    remove: async (payload) => {
        const { data } = await httpService.delete(userEndPoint + payload);
        return data;
    }
};

export default userService;
