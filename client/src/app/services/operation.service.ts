import httpService from "./http.service";
const operationEndPoint = "operation/";

const operationService = {
    fetchAll: async () => {
        const { data } = await httpService.get(operationEndPoint);
        return data;
    },
    current: async () => {
        const { data } = await httpService.get(
            operationEndPoint + "/myOperations"
        );
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.post(operationEndPoint, payload);
        return data;
    },
    update: async (payload) => {
        const { data } = await httpService.patch(
            operationEndPoint + payload._id,
            payload
        );
        return data;
    },
    remove: async (payload) => {
        const { data } = await httpService.delete(operationEndPoint + payload);
        return data;
    }
};

export default operationService;
