
import ApolloProviderWrapper from '@/lib/ApolloProvider'
import './globals.css'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ApolloProviderWrapper>
          {children}
        </ApolloProviderWrapper>
      </body>
    </html>
  )
}
