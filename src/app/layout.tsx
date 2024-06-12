import Footer from '@/components/common/footer'
import Navbar from '@/components/common/navbar'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Variety Blog',
  description:
    'El blog donde compartamos lo que nos interesa y lo que nos gusta, mostrando la variedad de cosas que nos rodean.'
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <link
        rel='icon'
        href='/icon?<generated>'
        type='image/<generated>'
        sizes='<generated>'
      />
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
