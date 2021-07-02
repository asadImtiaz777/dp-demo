const isLogin = () => {
    try {
        const user = localStorage.getItem("_DPWORLDUSER");
        return user;
    } catch {
        return false;
    } 
}

export default isLogin;