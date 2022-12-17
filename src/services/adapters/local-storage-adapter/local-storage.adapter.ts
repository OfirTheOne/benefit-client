export const clearStorage: () => void = () => {
    localStorage.clear();
};

export const getJwt: () => string | null = () => {
    return localStorage.getItem('s2pJwt');
};

export const setJwt: (jwt: string) => void = (jwt: string) => {
    localStorage.setItem('s2pJwt', jwt);
};
