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
    async createResident(fullname, phone, email) {
        const res = await instance.post(`HousingStock/client`, {
            Id: 0,
            Name: fullname,
            Phone: phone,
            Email: email,
            BindId: 0,
        });
        return res.data;
    },
    async getResident(phone) {
        const res = await instance.get(`HousingStock/client?phone=${phone}`);
        return res.data;
    },
    async bindResident(addressId, clientId) {
        const res = await instance.put(`HousingStock/bind_client`, {
            AddressId: addressId,
            ClientId: clientId,
        });
        return res.data;
    },
};
