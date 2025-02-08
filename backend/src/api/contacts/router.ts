import { Router } from 'express'
import {
    deleteContact,
    getContact,
    postContact,
} from './controllers/contacts.service'
import yupValidator from '../../middlewares/yupvalidator'
import {
    yupContactsDeleteSchema,
    yupContactsPostSchema,
} from '../../models/contactsSchema'

const contactRouter = Router()

contactRouter.get('/', getContact)
contactRouter.post(
    '/',
    yupValidator('body', yupContactsPostSchema),
    postContact
)
contactRouter.delete(
    '/',
    yupValidator('query', yupContactsDeleteSchema),
    deleteContact
)

export default contactRouter
