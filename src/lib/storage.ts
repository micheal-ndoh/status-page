import AWS from 'aws-sdk'

// AWS S3 Configuration
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
})

// Cubbit Configuration (S3-compatible)
const cubbit = new AWS.S3({
    accessKeyId: process.env.CUBBIT_ACCESS_KEY,
    secretAccessKey: process.env.CUBBIT_SECRET_KEY,
    endpoint: process.env.CUBBIT_ENDPOINT,
    s3ForcePathStyle: true,
    signatureVersion: 'v4',
})

export interface UploadResult {
    s3Url?: string
    cubbitUrl?: string
    success: boolean
    error?: string
}

export async function uploadToBothServices(
    file: Buffer,
    filename: string,
    contentType: string
): Promise<UploadResult> {
    const result: UploadResult = { success: false }

    try {
        // Upload to both services simultaneously
        const [s3Result, cubbitResult] = await Promise.allSettled([
            s3.upload({
                Bucket: process.env.AWS_S3_BUCKET!,
                Key: filename,
                Body: file,
                ContentType: contentType,
                ACL: 'public-read',
            }).promise(),
            cubbit.upload({
                Bucket: process.env.CUBBIT_BUCKET!,
                Key: filename,
                Body: file,
                ContentType: contentType,
                ACL: 'public-read',
            }).promise(),
        ])

        if (s3Result.status === 'fulfilled') {
            result.s3Url = s3Result.value.Location
        }

        if (cubbitResult.status === 'fulfilled') {
            result.cubbitUrl = cubbitResult.value.Location
        }

        result.success = s3Result.status === 'fulfilled' || cubbitResult.status === 'fulfilled'
    } catch (error) {
        result.error = error instanceof Error ? error.message : 'Unknown error'
    }

    return result
}

export async function getFileUrl(filename: string): Promise<string | null> {
    try {
        // Try Cubbit first
        try {
            await cubbit.headObject({
                Bucket: process.env.CUBBIT_BUCKET!,
                Key: filename,
            }).promise()

            return `${process.env.CUBBIT_ENDPOINT}/${process.env.CUBBIT_BUCKET}/${filename}`
        } catch {
            // If Cubbit fails, try S3
            try {
                await s3.headObject({
                    Bucket: process.env.AWS_S3_BUCKET!,
                    Key: filename,
                }).promise()

                return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${filename}`
            } catch {
                return null
            }
        }
    } catch (error) {
        console.error('Error getting file URL:', error)
        return null
    }
}

export async function syncBuckets(): Promise<void> {
    try {
        // List files in both buckets
        const [s3Files, cubbitFiles] = await Promise.all([
            s3.listObjectsV2({ Bucket: process.env.AWS_S3_BUCKET! }).promise(),
            cubbit.listObjectsV2({ Bucket: process.env.CUBBIT_BUCKET! }).promise(),
        ])

        const s3Keys = new Set(s3Files.Contents?.map(obj => obj.Key) || [])
        const cubbitKeys = new Set(cubbitFiles.Contents?.map(obj => obj.Key) || [])

        // Find files missing in Cubbit
        const missingInCubbit = Array.from(s3Keys).filter(key => !cubbitKeys.has(key))

        // Find files missing in S3
        const missingInS3 = Array.from(cubbitKeys).filter(key => !s3Keys.has(key))

        // Copy missing files to Cubbit
        for (const key of missingInCubbit) {
            if (key) {
                const file = await s3.getObject({
                    Bucket: process.env.AWS_S3_BUCKET!,
                    Key: key,
                }).promise()

                await cubbit.upload({
                    Bucket: process.env.CUBBIT_BUCKET!,
                    Key: key,
                    Body: file.Body,
                    ContentType: file.ContentType,
                    ACL: 'public-read',
                }).promise()
            }
        }

        // Copy missing files to S3
        for (const key of missingInS3) {
            if (key) {
                const file = await cubbit.getObject({
                    Bucket: process.env.CUBBIT_BUCKET!,
                    Key: key,
                }).promise()

                await s3.upload({
                    Bucket: process.env.AWS_S3_BUCKET!,
                    Key: key,
                    Body: file.Body,
                    ContentType: file.ContentType,
                    ACL: 'public-read',
                }).promise()
            }
        }

        console.log(`Sync completed: ${missingInCubbit.length} files copied to Cubbit, ${missingInS3.length} files copied to S3`)
    } catch (error) {
        console.error('Error syncing buckets:', error)
    }
} 