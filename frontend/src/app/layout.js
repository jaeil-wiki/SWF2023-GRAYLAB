import LayoutContainer from "@/components/LayoutContainer";

export const metadata = {
    title: 'DA-GOTCHI',
    description: '',
}

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body>
        <LayoutContainer>
            {children}
        </LayoutContainer>
        </body>
        </html>
    )
}
