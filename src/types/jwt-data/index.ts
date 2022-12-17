const resources = [
    'ADD_STORE_ITEM',
    'REMOVE_STORE_ITEM',
] as const;

const roles = [
    'SUPERVISOR',
    'PLAYER'
] as const;


export type Resource = typeof resources[number];

export type Role = typeof roles[number];

export type ProtectedResourceRoles = {
    active: {
        roles: Role[];
        isMimicAllowed?: boolean;
    };
    disabled?: {
        roles: Role[];
        isMimicAllowed?: boolean;
    };
};

export type ProtectedResources = {
    [key in Resource]: ProtectedResourceRoles;
};

export interface JwtUserRoles {
    user?: Role[];
}

export interface JwtTokenData {
    user: {
        guid: string;
        name: string;
        roles: JwtUserRoles;
    };
}


const jwtTokenData: JwtTokenData = {
    "user": {
        "guid": "123123-123123-123123-13123",
        "name": "Ofir Genish",
        "roles": {
            "user": ["SUPERVISOR", "PLAYER"]
        }
    }
} 

export interface AuthorizationState {
    protectedResources: ProtectedResources | null;
    userGuid?: string | null;
    userName?: string | null;
    userJWTRoles: JwtUserRoles | null;
    isError: boolean;
}

export interface ResourcesResponseData {
    timestamp: string;
    resources:
    {
        resource: Resource;
        method: {
            ACTIVE: {
                roles: Role[];
            };
            DISABLED?: {
                roles: Role[];
            };
        };
    }[]
}
