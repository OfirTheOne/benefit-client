export const clearStorage: () => void = () => {
    localStorage.clear();
};

export const getJwt: () => string | null = () => {
    return localStorage.getItem('cJwt');
};

export const setJwt: (jwt: string) => void = (jwt: string) => {
    localStorage.setItem('cJwt', jwt);
};
