import type { Metadata } from "next";
import { Geist, Geist_Mono, Bricolage_Grotesque } from "next/font/google";
import "./fonts.css";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage-grotesque",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sefask",
  description: "Best way to evaluate, Just Safe and easy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/img/logo-light.svg" sizes="any" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.documentElement.classList.add('no-transitions');
              setTimeout(() => {
                document.documentElement.classList.remove('no-transitions');
              }, 100);
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${bricolageGrotesque.variable} ${geistMono.variable} geist-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
