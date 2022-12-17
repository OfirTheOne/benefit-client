

export const isLocal = (): boolean => window.location.origin.includes('localhost'); // naive way but good enough.

export const IS_LOCAL = isLocal();