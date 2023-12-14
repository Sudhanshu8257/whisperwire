import type { Metadata } from "next";
import { Inter, Noto_Color_Emoji } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/theme-provider";
import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
const inter = Inter({ subsets: ["latin"] });
const noto = Noto_Color_Emoji({
  subsets: ["emoji"],
  weight: "400",
  variable: "--font-noto",
});
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
            {children}
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
