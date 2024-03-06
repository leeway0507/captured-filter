"use server"
import { ResponseProps } from '@/app/type'
import path from 'path'

export async function getData<T>(...params: string[]) {
  const reqUrl = path.join(process.env.BACKEND!, ...params)
  const r = await fetch(reqUrl)
  const resp: ResponseProps<T> = await r.json()
  return resp.data
}
