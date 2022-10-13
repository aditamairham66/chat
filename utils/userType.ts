interface CreateUsernameData {
    createUsername: {
        success: boolean
        error: string
    }
}

interface CreateUsernameVariables {
    username: string
}

export type {
    CreateUsernameData,
    CreateUsernameVariables,
}