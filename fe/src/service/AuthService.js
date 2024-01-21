import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {

    login(username, password) {
        return axios
            .post(API_URL + "signin", {
                username,
                password
            })
            .then(response => {
                if (response.data.accessToken) {

                    const user = {
                        username: username,
                        accessToken: response.data.accessToken,
                        role: response.data.roles // Lưu vai trò vào user object
                    };

                    localStorage.setItem("user", JSON.stringify(user));
                }

                return response.data;
            });
    }


    logout() {
        localStorage.removeItem("user");
    }

    register(username, email, password) {
        return axios.post(API_URL + "signup", {
            username,
            email,
            password
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }
}

export default new AuthService();
