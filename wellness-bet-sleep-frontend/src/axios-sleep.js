import axios from "axios";

const instance = axios.create({
    baseURL: "https://sleep-bet.herokuapp.com/"
});

export default instance;