import Script from 'next/script'
import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReduxStoreProvider from "@/store/provider"
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GrowYourMusic',
  description: 'GrowYourMusic',
  icons: {
    icon: '/logogym.png'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <html lang="en">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        </head>
        <link rel="preload" href="/js/feed.js" as="script" crossOrigin="anonymous" />

        <body className={inter.className}>
          <ToastContainer
            position="top-right"
            autoClose={2500}
            hideProgressBar={false}
            newestOnTop={false}
            limit={5}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <ReduxStoreProvider>
            {children}
          </ReduxStoreProvider>
          <Analytics />
          <Script
            src="https://kit.fontawesome.com/68c6324e4e.js"
            crossOrigin="anonymous"
          />
        </body>
      </html>
    </>
  )
}
