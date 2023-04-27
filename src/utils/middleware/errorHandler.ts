import express from 'express'


export function ErrorHandler(err: unknown,req: express.Request, res: express.Response, next: express.NextFunction) {

    // if (err instanceof zod.ZodError) {
    //     return res.status(400).send({ error: err })
    // }

    res.status(500).send({ error: 'Server error' })
}