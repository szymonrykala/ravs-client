
interface AppPathsInterface {
    readonly [index: string]: string
    PUBLIC: string,
    LOGIN: string,
    REGISTER: string,
    ACTIVATE: string,
    REMIND_PASSWORD: string,
    FAQ: string,

    HOME: string,
    SETTINGS: string,
    MY_PROFILE: string,
    INFRASTRUCTURE: string,
    ADDRESS: string,
    BUILDING: string,
    ROOM: string,
    USERS: string
};


interface AppDynamicPaths {
    readonly [indes: string]: (...params: any) => string,

    toRoom: (addressId: number, buildingId: number, roomId: number) => string,
    toBuilding: (addressId: number, buildingId: number) => string,
    toAddress: (addressId: number) => string,
    toUser: (userId: number) => string
}


const paths: { [index: string]: string } = {
    PUBLIC: '/public',
    FAQ: '/faq',
    HOME: '/app',
}


paths.LOGIN = paths.PUBLIC + '/login';
paths.REGISTER = paths.PUBLIC + '/register';
paths.ACTIVATE = paths.PUBLIC + '/activate';
paths.REMIND_PASSWORD = paths.PUBLIC + '/passwd';

paths.SETTINGS = paths.HOME + '/settings';
paths.MY_PROFILE = paths.HOME + '/me';

paths.USERS = paths.HOME + '/users';
paths.INFRASTRUCTURE = paths.HOME + '/infrastructure';
paths.ADDRESS = paths.HOME + '/addresses/:addressId';
paths.BUILDING = paths.ADDRESS + '/buildings/:buildingId';
paths.ROOM = paths.BUILDING + '/rooms/:roomId';


export const dynamicPaths: AppDynamicPaths = {
    toAddress: (addressId: number) => `/app/addresses/${addressId}`,
    toBuilding: (addressId: number, buildingId: number) => dynamicPaths.toAddress(addressId) + `/buildings/${buildingId}`,
    toRoom: (addressId: number, buildingId: number, roomId: number) => dynamicPaths.toBuilding(addressId, buildingId) + `/rooms/${roomId}`,
    toUser: (userId: number) => paths.USERS + `/${userId}`
}

export default paths as AppPathsInterface;