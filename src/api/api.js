import axios from "axios";

export const instance = axios.create({
    baseURL: ` https://dispex.org/api/vtest/`,
});

export const searchAPI = {
    async getStreets() {
        const res = await instance.get(`Request/streets`);
        return res.data;
    },
    async getHouses(id) {
        const res = await instance.get(`Request/houses/${id}`);
        return res.data;
    },
    async getFlats(id) {
        const res = await instance.get(`Request/house_flats/${id}`);
        return res.data;
    },
    async getResidentsInHouse(houseId) {
        const res = await instance.get(`HousingStock?houseId=${houseId}`);
        return res.data;
    },
};
