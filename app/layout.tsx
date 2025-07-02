import "@/app/assets/scss/globals.scss";  // ✅ Path benar
import "@/app/assets/scss/theme.scss";
import { Inter } from "next/font/google";
import { siteConfig } from "@/config/site";
import Providers from "@/provider/providers";
import "simplebar-react/dist/simplebar.min.css";
import TanstackProvider from "@/provider/providers.client";
import AuthProvider from "@/provider/auth.provider";
import "flatpickr/dist/themes/light.css";
import DirectionProvider from "@/provider/direction.provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning={true}>
      <body className={inter.className}>
        <AuthProvider>
          <TanstackProvider>
            <Providers>
              <DirectionProvider>{children}</DirectionProvider>
            </Providers>
          </TanstackProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

