// user type
type IUser = {
   success: boolean,
    statusCode: number,
    message: string,
    "data": {
        "id": string,
        "name": string,
        "email": string,
        "role": string,
        "status": string,
        "created_at": string,
        "updated_at": string
    }
}
// we take user as a props so that type will be a props
type NavbarProps = {
    user : IUser
}