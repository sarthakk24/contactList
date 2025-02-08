import * as yup from 'yup'

export const yupContactsPostSchema = yup.object({
    name: yup.string().required().trim(),
    email: yup.string().email().required().trim(),
    phone: yup.string().required().trim(),
    address: yup.string().required().trim(),
})

export const yupContactsDeleteSchema = yup.object({
    email: yup.string().email().required().trim(),
})
