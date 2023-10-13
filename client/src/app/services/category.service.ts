import httpService from "./http.service";
const categoryEndPoint = "category/";

const categoryService = {
    fetchAll: async () => {
        const { data } = await httpService.get(categoryEndPoint);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.post(categoryEndPoint, payload);
        return data;
    },
    current: async () => {
        const { data } = await httpService.get(
            categoryEndPoint + "/myCategories"
        );
        return data;
    },
    update: async (payload) => {
        const { data } = await httpService.patch(
            categoryEndPoint + payload._id,
            payload
        );
        return data;
    },
    remove: async (payload) => {
        const { data } = await httpService.delete(categoryEndPoint + payload);
        return data;
    }
};

export default categoryService;
