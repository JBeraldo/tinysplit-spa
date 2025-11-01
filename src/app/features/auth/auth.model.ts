export interface LoginRequestPayload {
    username: string
    password: string
}

export interface LoginRequestResponse {
    token: string
    refresh_token: string
}