import {z} from 'zod'

export const BookmarkSchema=z.object({
    url:z.url(),
    title:z.string().min(1),
    description:z.string().optional(),

})
