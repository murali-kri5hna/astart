
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'spartan': ['League Spartan', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#6B46C1',
					dark: '#1F1F1F',
					gradient: 'linear-gradient(135deg, #6B46C1 0%, #1F1F1F 100%)',
				},
				accent: {
					DEFAULT: '#9333EA',
					foreground: '#FFFFFF'
				},
				success: {
					DEFAULT: '#10B981',
					foreground: '#FFFFFF'
				},
				destructive: {
					DEFAULT: '#EF4444',
					foreground: '#FFFFFF'
				},
				card: {
					DEFAULT: 'rgba(255, 255, 255, 0.1)',
					foreground: '#FFFFFF'
				},
				muted: {
					DEFAULT: 'rgba(255, 255, 255, 0.6)',
					foreground: 'rgba(255, 255, 255, 0.4)'
				},
				popover: {
					DEFAULT: 'rgba(255, 255, 255, 0.1)',
					foreground: '#FFFFFF'
				},
				secondary: {
					DEFAULT: 'rgba(255, 255, 255, 0.1)',
					foreground: '#FFFFFF'
				},
				sidebar: {
					DEFAULT: 'rgba(255, 255, 255, 0.1)',
					foreground: '#FFFFFF',
					primary: '#9333EA',
					'primary-foreground': '#FFFFFF',
					accent: 'rgba(255, 255, 255, 0.1)',
					'accent-foreground': '#FFFFFF',
					border: 'rgba(255, 255, 255, 0.1)',
					ring: '#9333EA'
				}
			},
			borderRadius: {
				lg: '20px',
				md: '16px',
				sm: '12px',
				xl: '24px',
				'2xl': '32px'
			},
			animation: {
				'gradient-shift': 'gradient-shift 8s ease-in-out infinite',
				'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'card-enter': 'card-enter 0.3s ease-out',
				'card-exit': 'card-exit 0.3s ease-out',
				'swipe-left': 'swipe-left 0.3s ease-out',
				'swipe-right': 'swipe-right 0.3s ease-out',
			},
			keyframes: {
				'gradient-shift': {
					'0%, 100%': {
						'background-position': '0% 50%'
					},
					'50%': {
						'background-position': '100% 50%'
					}
				},
				'card-enter': {
					'0%': {
						opacity: '0',
						transform: 'scale(0.9) translateY(20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'scale(1) translateY(0)'
					}
				},
				'card-exit': {
					'0%': {
						opacity: '1',
						transform: 'scale(1) translateY(0)'
					},
					'100%': {
						opacity: '0',
						transform: 'scale(0.9) translateY(20px)'
					}
				},
				'swipe-left': {
					'0%': {
						transform: 'translateX(0) rotate(0deg)',
						opacity: '1'
					},
					'100%': {
						transform: 'translateX(-100vw) rotate(-30deg)',
						opacity: '0'
					}
				},
				'swipe-right': {
					'0%': {
						transform: 'translateX(0) rotate(0deg)',
						opacity: '1'
					},
					'100%': {
						transform: 'translateX(100vw) rotate(30deg)',
						opacity: '0'
					}
				}
			},
			backgroundImage: {
				'mesh-gradient': 'linear-gradient(135deg, #6B46C1 0%, #9333EA 25%, #1F1F1F 50%, #6B46C1 75%, #9333EA 100%)',
			},
			backgroundSize: {
				'400': '400% 400%'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
