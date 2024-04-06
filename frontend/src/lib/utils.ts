import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default cn;

export function encodeHex(s:string) {
  return Buffer.from(s).toString('hex');
}
export function decodeHex(encode:string) {
  return Buffer.from(encode, 'hex').toString();
}
