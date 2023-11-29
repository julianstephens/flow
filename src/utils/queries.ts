const baseUrl = "http://localhost:3000/api";

export const getSession = async () => {
    const res = await fetch(`${baseUrl}/auth/session`);
    return res.json();
};
