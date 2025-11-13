import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
// export const config = {
//     api: {
//         bodyParser: false,
//     },
// };
export async function POST(request: NextRequest, req: NextResponse) {
    const data = await request.formData()
    const file: File | null = data.get('media') as unknown as File

    if (!file) {
        return NextResponse.json({ success: false, message: 'No file provided.' }, { status: 200 })
    }
    if (file.type.startsWith('image/')) {
        if (file.size > 2 * 1024 * 1024) {
            return NextResponse.json({ success: false, message: 'Image file size exceeds 2MB limit.' }, { status: 200 })
        }
    } else if (file.type.startsWith('video/')) {
        if (file.size > 100 * 1024 * 1024) {
            return NextResponse.json({ success: false, message: 'Video file size exceeds 100MB limit.' }, { status: 200 })
        }
    } else {
        return NextResponse.json({ success: false, message: 'Only image and video files are allowed.' }, { status: 200 })
    }

    const fileExtension = file.name.split('.').pop() || 'jpg' // Default to 'jpg' if extension is missing
    const newFileName = `${Date.now()}.${fileExtension}`

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const path = `public/posts/${newFileName}`
    try {
        await writeFile(path, buffer)
        return NextResponse.json({ success: true, fileName: newFileName }, { status: 200 })
    } catch (error) {
        console.error('Error uploading file:', error)
        return NextResponse.json({ success: false, message: 'Error uploading file.' }, { status: 200 })
    }
}
