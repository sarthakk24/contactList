import { Router } from 'express'
import contactRouter from './contacts/router'

export default (): Router => {
    const app = Router()
    //TODO: add routes here...
    app.use('/contact', contactRouter)
    return app
}
