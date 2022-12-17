

import { setUserJWTRoles } from "../../redux/features/authorization/authorization.slice";
import { getStore } from "../../redux/store";
import { JwtTokenData, JwtUserRoles, ResourcesResponseData } from "../../types/jwt-data";
import { clearStorage, setJwt } from "../adapters/local-storage-adapter/local-storage.adapter";
import jwt from 'jsonwebtoken';


const usersCredentials = [
    {
        user: 'Adi',
        pass: '123123'
    },
    {
        user: 'Danny',
        pass: '123123'
    },
    {
        user: 'Shir',
        pass: '123123'
    }
];

const usersData = [
    {
        name: 'adi',
        user: 'Adi',
        guid: '123123-123123-123123',
        id: '01',
        roles: <JwtUserRoles>{ user: ['SUPERVISOR'] }
    },
    {
        name: 'danny',
        user: 'Danny',
        guid: '345345-345345-345345',
        id: '02',
        roles: <JwtUserRoles>{ user: ['PLAYER'] }
    },
    {
        name: 'shir',
        user: 'Shir',
        guid: '456456-456456-456456',
        id: '03',
        roles: <JwtUserRoles>{ user: ['PLAYER'] }
    }
];




// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Imd1aWQiOiIxMjMxMjMtMTIzMTIzLTEyMzEyMy0xMzEyMyIsIm5hbWUiOiJPZmlyIEdlbmlzaCIsInJvbGVzIjp7InVzZXIiOlsiU1VQRVJWSVNPUiIsIlBMQVlFUiJdfX19.QbKEslNNZ5tVeDR56CC7sbhI5Gf5m1dQaoRIey6r84U"

export class SystemService {
    async getProtectedResources(): Promise<ResourcesResponseData> {
        // rewards.push(reward);

        return {
            timestamp: (new Date()).toISOString(),
            resources: <ResourcesResponseData['resources']>[
                {
                    resource: 'ADD_STORE_ITEM',
                    method: {
                        ACTIVE: { roles: ['SUPERVISOR'] }
                    }
                }, {
                    resource: 'REMOVE_STORE_ITEM',
                    method: {
                        ACTIVE: { roles: ['SUPERVISOR'] }
                    }
                }
            ]
        };
    }

    async login(user: string, pass: string): Promise<{ token?: string | undefined }> {
        const foundCred = usersCredentials.find((cred) => cred.user == user)
        if(user === foundCred?.user && pass === foundCred?.pass) {
            const foundUserData = usersData.find(userData => userData.user === user);
            if(foundUserData) {
                const { name, guid, roles } = foundUserData;
                const token = jwt.sign({ user: { name, guid, roles } }, 'my-fake-secret')
                setJwt(token);
                return {
                    token
                }
            }
        }
        throw new Error('User not exists');
        // -- temp - only in mocking stage
        // const decodedTokenData = jwt.decode(token) as JwtTokenData;
        // const store = getStore();
        // store.dispatch(setUserJWTRoles(decodedTokenData.user));
        //
    }


    async logout() {
        // -- temp - only in mocking stage
        clearStorage();
    }

}

export const systemService = new SystemService();

