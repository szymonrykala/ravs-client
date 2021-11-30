import Image from "../../../../models/Image";
import { DetailedUser } from "../../../../models/User";
import { UpdateUserParams } from "../../../../services/UserService";



export default interface UserContextValue {
    user: DetailedUser,
    deleteUser: () => Promise<boolean>,
    updateUser: (data: UpdateUserParams) => Promise<boolean>,
    uploadImage: (image: Blob) => Promise<void>,
    deleteImage: (image: Image) => Promise<void>,
}