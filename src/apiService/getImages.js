import axios from "axios";

export const getImages = async (page, query) => {
    const API_KEY = "KHY_qjzNhH1UiRyRmWjLVIL4iaIIKfBINoOo9m-Q8J4";
    axios.defaults.baseURL = "https://api.unsplash.com/search/photos";
    const { data } = await axios.get(`?client_id=${API_KEY}&page=${page}&query=${query}`);
    return data;
}