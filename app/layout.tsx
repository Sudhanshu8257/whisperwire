import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { RequestContextProvider } from "@/context/Request";
import { ClerkProvider } from "@clerk/nextjs";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WhisperWire",
  description:
    "Whisper Wire: Your go-to app for secure, seamless, and real-time global communication",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
        >
          <ClerkProvider
            appearance={{
              elements: {
                formButtonPrimary:
                  "bg-primary text-primary-foreground hover:bg-[#6ccede]",
                footerActionLink: "text-primary-foreground",
                headerTitle: "text-center",
                headerSubtitle: "text-center",
              },
            }}
          >
            <RequestContextProvider>{children}</RequestContextProvider>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
