import { Router } from 'express'
import healthCheckRoute from './healthcheck'
import contactRouter from './contacts/router'

export default (): Router => {
    const app = Router()
    //TODO: add routes here...
    app.use('/contact', contactRouter)
    app.use('/health', healthCheckRoute)
    return app
}
