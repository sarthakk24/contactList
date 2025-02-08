import express from 'express'
import Loaders from './loaders'
import Logger from './loaders/logger'
import cron from 'node-cron'

const startServer = async () => {
    try {
        const app = express()
        await Loaders({ expressApp: app })
        app.listen('5050', () => {
            Logger.info(`🛡️ Server listening on port: 5050 🛡️`)
        }).on('error', (err) => {
            Logger.error(err)
            process.exit(1)
        })
    } catch (error) {
        Logger.error(error)
        process.exit(1)
    }
}

startServer()
