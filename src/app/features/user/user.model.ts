export interface User {
    id: number,
    name: string,
    password: string | null
    nickname: string | null
    email: string
}
export type RegisterUserPayload = Partial<Omit<User,"id" | 'nickname'>>