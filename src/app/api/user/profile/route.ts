import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'

// export const config = {
//     api: {
//         bodyParser: false,
//     },
// };
export async function POST(request: NextRequest) {
    const data = await request.formData()
    const file: File | null = data.get('profile') as unknown as File

    if (!file) {
        return NextResponse.json({ success: false, message: 'No file provided.' })
    }

    if (!file.type.startsWith('image/')) {
        return NextResponse.json({ success: false, message: 'Only image files are allowed.' })
    }

    if (file.size > 5 * 1024 * 1024) {
        return NextResponse.json({ success: false, message: 'File size exceeds 5MB limit.' })
    }

    const fileExtension = file.name.split('.').pop() || 'jpg' // Default to 'jpg' if extension is missing
    const newFileName = `${Date.now()}.${fileExtension}`

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const path = `public/artist_img/${newFileName}`
    try {
        await writeFile(path, buffer)
        return NextResponse.json({ success: true, fileName: newFileName }, { status: 200 })

    } catch (error) {
        console.error('Error uploading file:', error)
        return NextResponse.json({ success: false, message: 'Error uploading file.' })
    }
}
