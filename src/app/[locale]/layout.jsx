import { Poppins } from "next/font/google";

export const metadata = {
  title: "Music Restaurant",
  description: "Enjoy sharing your taste",
};

export default async function LocaleLayout({ children }) {


  return (
    <html>
      <body className={"w-full flex flex-col items-center gap-12"}>
            <main className="2xl:w-[1400px] xl:w-[1200px] lg:w-[1000px] md:w-[750px] sm:w-[600px] w-[350px]">
              {children}
              <div className="w-full h-28"></div>
            </main>
      </body>
    </html>
  );
}
