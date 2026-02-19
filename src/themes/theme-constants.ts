export const BANKING_THEME = {
  name: 'Premium Corporate',
  colors: {
    light: {
      background: 'hsl(210, 20%, 98%)',
      foreground: 'hsl(222, 47%, 11%)',
      primary: 'hsl(221, 83%, 53%)', // Trust Blue
      secondary: 'hsl(210, 40%, 96.1%)',
      accent: 'hsl(210, 40%, 96.1%)',
      destructive: 'hsl(0, 84.2%, 60.2%)',
      muted: 'hsl(210, 40%, 96.1%)',
      border: 'hsl(214.3, 31.8%, 91.4%)',
      input: 'hsl(214.3, 31.8%, 91.4%)',
      ring: 'hsl(221, 83%, 53%)',
    },
    dark: {
      background: 'hsl(222, 47%, 11%)',
      foreground: 'hsl(210, 40%, 98%)',
      primary: 'hsl(217, 91%, 60%)', // Lighter Blue for Dark Mode
      secondary: 'hsl(217, 32%, 17%)',
      accent: 'hsl(217, 32%, 17%)',
      destructive: 'hsl(0, 62%, 30%)',
      muted: 'hsl(217, 32%, 17%)',
      border: 'hsl(217, 32%, 17%)',
      input: 'hsl(217, 32%, 17%)',
      ring: 'hsl(224, 76%, 48%)',
    },
  },
  borderRadius: '0.5rem',
} as const;
