import { DetailedUser } from "../../../../models/User";
import { UpdateUserParams } from "../../../../services/UserService";



export default interface UserContextValue {
    user: DetailedUser,
    deleteUser: () => Promise<boolean>,
    updateUser: (data: UpdateUserParams) => Promise<boolean>,
}