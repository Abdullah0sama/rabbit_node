import express from "express"
import { ErrorHandler } from "./utils/middleware/errorHandler"
import { UserController } from "./components/User/UserController"

export function createApp() {
    const app = express()

    const userController = new UserController()
    app.use('/', userController.routes())
    
    app.use(ErrorHandler)
    return app
}

