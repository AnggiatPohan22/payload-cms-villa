import type { Metadata } from 'next'
import { NotFoundPage } from '@payloadcms/next/views'
import config from '@payload-config'
import { importMap } from '../importMap.js'

type Args = {
  params: Promise<{
    segments: string[]
  }>
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
}

export const metadata: Metadata = {
  title: 'Not Found',
}

export default function NotFound(args: Args) {
  return NotFoundPage({ ...args, config, importMap })
}
