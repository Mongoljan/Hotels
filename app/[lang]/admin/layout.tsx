import type { Metadata } from "next";
import { getDictionary } from "../dictionaries";
import MainLayout from "./admin_layout";
export const metadata: Metadata = {
  // title: "Уран бүтээлч хөлслөх вэбсайт",
  // description: "",
};
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

      <body className={` h-full`}>
          <MainLayout dict={dict} lang={lang}>
            {children}
          </MainLayout>
      </body>
    </html>
  );
}
