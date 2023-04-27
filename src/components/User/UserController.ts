import { Router } from "express";


export class UserController {
    constructor(

    ){}

    routes() {
        const router = Router()

        router.get('/users', (req, res) => {
            res.status(200).send('User Data')
        })

        return router
    }
}