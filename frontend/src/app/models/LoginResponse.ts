export interface LoginResponse {
  user: User
  token: string
}

export interface User {
  name: string
}
