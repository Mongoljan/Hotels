import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import "./globals.css";
import { getDictionary } from "../dictionaries";
import MainLayout from "./admin_layout";
// import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Уран бүтээлч хөлслөх вэбсайт",
  description: "",
};

export async function generateStaticParams() {
  return [{ lang: "mn" }, { lang: "en" }];
}

type Props = {
  children: React.ReactNode;
  params: { lang: string };
};

export default async function RootLayout({
  children,
  params: { lang },
}: Readonly<Props>) {
  const dict = await getDictionary(lang);

  return (
    <html lang={lang} className="h-full">
   {/* <head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link 
    href="https://fonts.googleapis.com/css2?family=Mulish:wght@200;400;600;800&display=swap" 
    rel="stylesheet" 
  />
</head> */}

      <body className={`font-mulish h-full`}>
        {/* <ThemeProvider defaultTheme="dark" enableSystem disableTransitionOnChange> */}
          <MainLayout dict={dict} lang={lang}>
            {children}
          </MainLayout>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
