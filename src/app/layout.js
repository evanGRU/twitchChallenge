import "./globals.scss";
import { Analytics } from "@vercel/analytics/next"

export const metadata = {
    title: "Emerald Challenge"

};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics/>
      </body>
    </html>
  );
}
