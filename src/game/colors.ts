export const colors = {
  pink: '#e279a3',
  pink2: '#c92c6b',
  red: '#d34936',
  red2: '#b81a05',
  yellow: '#f6f13a',
  yellow2: '#f99628',
  green: '#58bd5b',
  green2: '#317c34',
  cyan: '#3dd6d1',
  cyan2: '#1e8f8b',
  blue: '#3c76b6',
  blue2: '#224467',
  violet: '#C9B1FF',
  violet2: '#5c39ac',
  black: '#131217',
  white: '#f9f9f9',
}

export type Color = (typeof colors)[keyof typeof colors];
