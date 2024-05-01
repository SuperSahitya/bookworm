import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import CartProvider from "../providers/cartProviders";
import UserProvider from "../providers/userProviders";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata = {
  title: "BookWorm",
  description: "Marketplace For Books We Love",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <UserProvider>
          <CartProvider>
            <Navbar></Navbar>
            {children}
          </CartProvider>
        </UserProvider>
      </body>
    </html>
  );
}
