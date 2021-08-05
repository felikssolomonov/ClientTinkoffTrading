import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3001",
    // headers: {
    //   "Content-Type": "application/json",
    //   Accept: "application/json",
    // },
});

export interface RegistrationProps {
    email: String;
    name: String;
    password: String;
}

export interface RegistrConfirmProps {
    email: String;
    hashPassword: String;
}

export interface LogInProps {
    email: String;
    password: String;
}

export const requestServer = {
    getCurrencies: async () => {
        try {
            const response = await axiosInstance.get("/");
            return response.data.currency.currencies;
        } catch (error: any) {
            return error;
        }
    },
    getPortfolio: async () => {
        try {
            const response = await axiosInstance.get("/portfolio");
            return response.data.portfolio.positions;
        } catch (error: any) {
            return error;
        }
    },
    // registrConfirm: async ({
    //     email,
    //     hashPassword,
    // }: RegistrConfirmProps): Promise<AxiosResponse<responseType>> => {
    //     try {
    //         const response = await axiosInstance.post(
    //             "auth/registrConfirm",
    //             JSON.stringify({
    //                 email,
    //                 hashPassword,
    //             })
    //         );
    //         console.log(response.data);
    //         return response.data;
    //     } catch (error) {
    //         return error;
    //     }
    // },
    // logIn: async ({ email, password }: LogInProps): Promise<responseType> => {
    //     try {
    //         const response = await axiosInstance.post(
    //             "auth/login",
    //             JSON.stringify({
    //                 email,
    //                 password,
    //             })
    //         );
    //         console.log(response.data);
    //         return response.data;
    //     } catch (error) {
    //         return error;
    //     }
    // },
    // logOut: async (): Promise<AxiosResponse<any>> => {
    //     const response = await axiosInstance.delete("auth/logout");
    //     console.log(response.data);
    //     return response.data;
    // },
    // checkAuth: async (): Promise<AxiosResponse<any>> => {
    //     const response = await axiosInstance.post("auth/checkAuth");
    //     console.log(response.data);
    //     return response.data;
    // },
};
