import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import  {siteMetadata} from "./utils/siteMetadata.mjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Zuber Khan",
  description: "Portfolio",
};

// This function prevents the flash of light mode
function DarkModeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            // Check for saved theme preference or default to dark
            const savedTheme = localStorage.getItem('theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            
            if (savedTheme === 'light') {
              document.documentElement.classList.remove('dark');
              document.body.style.backgroundColor = '#ffffff';
            } else {
              document.documentElement.classList.add('dark');
              document.body.style.backgroundColor = '#121212';
            }
          })();
        `,
      }}
    />
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <head>
        <meta name="description" content={siteMetadata.description} />
        {siteMetadata.googleSiteVerification && (
          <meta
            name="google-site-verification"
            content={siteMetadata.googleSiteVerification}
          />
        )}
        <DarkModeScript />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}
