export const colors = {
  pink: '#e279a3',
  pink2: '#c92c6b',
  red: '#d34936',
  red2: '#b81a05',
  yellow: '#f6f13a',
  yellow2: '#f99628',
  green: '#58bd5b',
  green2: '#317c34',
  blue: '#5dbfe8',
  blue2: '#1c92c4',
  indigo: '#3c76b6',
  indigo2: '#224467',
  violet: '#C9B1FF',
  violet2: '#5c39ac',
  black: '#131217',
  white: '#f9f9f9',
}

export type Color = (typeof colors)[keyof typeof colors];
