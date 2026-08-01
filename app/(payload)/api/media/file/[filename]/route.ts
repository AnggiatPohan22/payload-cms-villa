import path from 'node:path'
import { readFile, stat } from 'node:fs/promises'
import { NextResponse } from 'next/server'

const mediaDir = path.resolve(process.cwd(), 'media')

const mimeTypes: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
}

type RouteContext = {
  params: Promise<{ filename: string }>
}

const getMediaFile = async (context: RouteContext) => {
  const { filename } = await context.params
  const safeFilename = path.basename(filename)
  const extension = path.extname(safeFilename).toLowerCase()

  if (safeFilename !== filename || !mimeTypes[extension]) {
    return null
  }

  const filePath = path.resolve(mediaDir, safeFilename)

  if (!filePath.startsWith(`${mediaDir}${path.sep}`)) {
    return null
  }

  return {
    filePath,
    mimeType: mimeTypes[extension],
  }
}

const headersFor = (mimeType: string, size?: number) => {
  const headers = new Headers({
    'Cache-Control': 'public, max-age=31536000, immutable',
    'Content-Type': mimeType,
  })

  if (typeof size === 'number') {
    headers.set('Content-Length', String(size))
  }

  return headers
}

export async function GET(_request: Request, context: RouteContext) {
  const mediaFile = await getMediaFile(context)

  if (!mediaFile) {
    return NextResponse.json({ message: 'Media file not found' }, { status: 404 })
  }

  try {
    const file = await readFile(mediaFile.filePath)

    return new NextResponse(new Uint8Array(file), {
      headers: headersFor(mediaFile.mimeType, file.byteLength),
      status: 200,
    })
  } catch {
    return NextResponse.json({ message: 'Media file not found' }, { status: 404 })
  }
}

export async function HEAD(_request: Request, context: RouteContext) {
  const mediaFile = await getMediaFile(context)

  if (!mediaFile) {
    return new NextResponse(null, { status: 404 })
  }

  try {
    const fileStat = await stat(mediaFile.filePath)

    return new NextResponse(null, {
      headers: headersFor(mediaFile.mimeType, fileStat.size),
      status: 200,
    })
  } catch {
    return new NextResponse(null, { status: 404 })
  }
}
