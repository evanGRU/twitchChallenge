import "./globals.scss";

export const metadata = {
    title: "Emerald Challenge"

};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
