interface CreateUsernameData {
    createUsername: {
        success: boolean
        error: string
    }
}

interface CreateUsernameVariables {
    username: string
}

interface SearchUsernameData {
    searchUsername: SearchUser[]
}

interface SearchUser {
    id: string
    username: string
}

interface SearchUsernameVariables {
    username: string
}

export type {
    CreateUsernameData,
    CreateUsernameVariables,
    SearchUsernameData,
    SearchUsernameVariables,
    SearchUser,
}