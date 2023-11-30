import { Request } from "express"
export interface Result {
    role: 'employee' | 'admin' | 'none'
}

export interface GetUserAuthInfoRequest extends Request {
  user: any // or any other type
}