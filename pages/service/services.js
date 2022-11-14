import httpService from "./http-service";

const registerCreate = async (data) => {
    console.log(data)
    let result = await httpService.get("/register?email=" + data.email);
    if (result.data.length != 0) {
        const myData = { status: 0, rdata: [], message: "Email Already exist" };
        return myData;
    }

    var insert_data = await httpService.post("/register", data);
    console.log(insert_data)
    const insert_data_result = {
        status: 1,
        rdata: insert_data.data,
        message: "User successfull register",
    };
    return insert_data_result;
};

const loginAuth = async (signInData) => {
    var result = await httpService.get("/register?email=" + signInData.emailData);
    if (result.data.length == 0) {
        const data = {
            status: 0,
            rdata: "",
            message: "⚠️ Your account not exist. Please register your account",
        };
        return data;
    }
    if (result.data[0].password != signInData.passData) {
        const data = {
            status: 0,
            rdata: "",
            message: "❌ Invalid Password!!.. Please enter correct password",
        };
        return data;
    }

    const data = {
        status: 1,
        rdata: result.data[0],
        message: "✔️ Login Successfull",
    };
    return data;
};
export const Service = {
    registerCreate,
    loginAuth
}