import axios from "axios"

export const authApi={
    register: async(userName,email,password)=>{ const { data } = await axios.get(`http://localhost:3000/users?email=${email}`);
    if (data.length > 0) {
        throw new Error("This email is already in use");
    }
        const user = await axios.post("http://localhost:3000/users",{userName,email,password});
        return user;
    },

    login: async(email, password) => {
    const { data } = await axios.get(`http://localhost:3000/users?email=${email}&password=${password}`);
    const user = data[0];
    if (!user) throw new Error("Error");
    delete user.password;
    return user;
    },
}