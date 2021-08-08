export interface User {
  id?: number,
  firstName: string,
  lastName: string,
  email: string,
  password: string
}

export interface Node {
  id?: number,
  hash: string,
  previousHash: string,
  message: string,
  from: string,
  to: string,
  createdAt: string
}

export interface SQLiteError extends Error {
  errno: number
}
