// app/layout.tsx
import "./globals.css";
import ClientLayout from "./components/ClientLayout";

export const metadata = {
  title: "Digitopia Frontend",
  description: "Case study frontend app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
