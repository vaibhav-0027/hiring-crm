const userInfoKey = "hiring-crm-userInfo";

export const getUserInfo = async () => {
    const userInfo = await localStorage.getItem(userInfoKey) || "";
    if(userInfo === "") {
        return {};
    }
    return JSON.parse(userInfo);
}

export const setUserInfo = async (value: string) => {
    await localStorage.setItem(userInfoKey, value);
}

export const clearUserInfo = async() => {
    await localStorage.setItem(userInfoKey, "");
}