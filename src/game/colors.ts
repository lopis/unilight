export const colors = {
  red: 'hsl(0, 64%, 52%)',
  red2: 'hsl(0, 95%, 37%)',
  yellow: 'hsl(46, 85%, 58%)',
  yellow2: 'hsl(36, 80%, 57%)',
  yellow3: 'hsl(31, 82%, 47%)',
  green: 'hsl(103, 43%, 54%)',
  green2: 'hsl(103, 43%, 34%)',
  cyan: 'hsl(154, 72%, 74%)',
  cyan2: 'hsl(154, 72%, 54%)',
  blue: 'hsl(206, 72%, 48%)',
  blue2: 'hsl(206, 72%, 27%)',
  magenta: 'hsl(309, 79%, 78%)',
  magenta2: 'hsl(309, 63%, 61%)',
  magenta3: 'hsl(309, 57%, 41%)',
  black: '#131217',
  white: '#f9f9f9',
}

export type Color = (typeof colors)[keyof typeof colors];
