import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import  {siteMetadata} from "./utils/siteMetadata.mjs";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
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
              document.body.style.backgroundColor = '#000000';
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
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased text-white overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
