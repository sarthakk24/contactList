import { Request, Response, NextFunction } from 'express'

const contacts = [
    {
        name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        phone: '9876543210',
        address: '123 Maple Street',
    },
    {
        name: 'Michael Smith',
        email: 'michael.smith@example.com',
        phone: '8765432109',
        address: '456 Oak Avenue',
    },
    {
        name: 'Sophia Brown',
        email: 'sophia.brown@example.com',
        phone: '7654321098',
        address: '789 Pine Road',
    },
]

export const getContact = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        res.status(201).json({
            contacts,
            success: true,
            message: 'Get contact successful',
        })
    } catch (err) {
        res.status(err.status || 500).json({
            success: false,
            message: err.message,
        })
    }
}

export const postContact = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { name, email, phone, address } = req.body

        const contact = {
            name,
            email,
            phone,
            address,
        }

        contacts.push(contact)

        res.status(201).json({
            success: true,
            message: 'Post contact successful',
        })
    } catch (err) {
        res.status(err.status || 500).json({
            success: false,
            message: err.message,
        })
    }
}

export const deleteContact = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { email } = req.query

        const index = contacts.findIndex((contact) => contact.email === email)

        if (index !== -1) {
            contacts.splice(index, 1)
            res.status(200).json({
                success: true,
                message: 'Delete contact successful',
            })
        } else {
            res.status(404).json({
                success: false,
                message: 'Contact not found',
            })
        }
    } catch (err) {
        res.status(err.status || 500).json({
            success: false,
            message: err.message,
        })
    }
}
