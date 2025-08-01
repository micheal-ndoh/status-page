const STRAPI_URL = process.env.STRAPI_URL
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN

export interface StrapiResponse<T> {
    data: T[]
    meta: {
        pagination: {
            page: number
            pageSize: number
            pageCount: number
            total: number
        }
    }
}

export interface IncidentTemplate {
    id: number
    attributes: {
        title: string
        description: string
        severity: 'MINOR' | 'MAJOR' | 'CRITICAL'
        services: string[]
        createdAt: string
        updatedAt: string
    }
}

export async function fetchIncidentTemplates(): Promise<IncidentTemplate[]> {
    if (!STRAPI_URL || !STRAPI_TOKEN) {
        console.warn('Strapi configuration missing')
        return []
    }

    try {
        const response = await fetch(`${STRAPI_URL}/api/incident-templates?populate=*`, {
            headers: {
                'Authorization': `Bearer ${STRAPI_TOKEN}`,
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            throw new Error(`Strapi API error: ${response.status}`)
        }

        const data: StrapiResponse<IncidentTemplate> = await response.json()
        return data.data
    } catch (error) {
        console.error('Error fetching incident templates:', error)
        return []
    }
}

export async function fetchStaticContent(contentType: string): Promise<any> {
    if (!STRAPI_URL || !STRAPI_TOKEN) {
        console.warn('Strapi configuration missing')
        return null
    }

    try {
        const response = await fetch(`${STRAPI_URL}/api/${contentType}?populate=*`, {
            headers: {
                'Authorization': `Bearer ${STRAPI_TOKEN}`,
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            throw new Error(`Strapi API error: ${response.status}`)
        }

        const data = await response.json()
        return data.data
    } catch (error) {
        console.error(`Error fetching ${contentType}:`, error)
        return null
    }
} 