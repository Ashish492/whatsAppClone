export interface User {
  name: string
  email: string
}
export interface UserWithID extends User {
  id: number
}
