import { z } from 'zod'

export const serviceSchema = z.object({
    name: z.string().min(1, 'Service name is required').max(100),
    description: z.string().optional(),
    url: z.string().url().optional().or(z.literal('')),
    logo: z.string().optional(),
})

export const incidentSchema = z.object({
    title: z.string().min(1, 'Title is required').max(200),
    description: z.string().min(1, 'Description is required').max(2000),
    severity: z.enum(['MINOR', 'MAJOR', 'CRITICAL']),
    serviceIds: z.array(z.string()).min(1, 'At least one service must be selected'),
})

export const incidentUpdateSchema = z.object({
    message: z.string().min(1, 'Update message is required').max(1000),
    status: z.enum(['investigating', 'identified', 'monitoring', 'resolved']),
})

export const userSchema = z.object({
    name: z.string().min(1, 'Name is required').max(100),
    email: z.string().email('Invalid email address'),
    role: z.enum(['ADMIN', 'USER']).default('USER'),
})

export const fileUploadSchema = z.object({
    file: z.instanceof(File).refine(
        (file) => file.size <= 10 * 1024 * 1024, // 10MB limit
        'File size must be less than 10MB'
    ).refine(
        (file) => ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.type),
        'Only image files are allowed'
    ),
})

export type ServiceFormData = z.infer<typeof serviceSchema>
export type IncidentFormData = z.infer<typeof incidentSchema>
export type IncidentUpdateFormData = z.infer<typeof incidentUpdateSchema>
export type UserFormData = z.infer<typeof userSchema>
export type FileUploadData = z.infer<typeof fileUploadSchema> 