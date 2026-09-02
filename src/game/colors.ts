export const colors = {
  red: '#e33f3f',
  red2: '#b80505',
  yellow: '#fad354',
  yellow2: '#e9a33a',
  orange: '#df6807',
  orange2: '#a13c05',
  green: '#74bc57',
  green2: '#477c31',
  green3: '#254f14',
  cyan: '#35b7de',
  cyan2: '#238faf',
  blue: '#2f52c6',
  blue2: '#1a2e70',
  magenta: '#f39be6',
  magenta2: '#da5dc7',
  magenta3: '#a42d92',
  black: '#131217',
  white: '#f9f9f9',
}

export type Color = (typeof colors)[keyof typeof colors];
