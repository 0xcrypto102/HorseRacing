"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";
import Footer from "./Footer";
import { usePathname } from "next/navigation";

const CustomLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const bgUrl = pathname === "/" ? "url('/images/background.png')" : "url('/images/background1.png')";

  return (
    <main className="fixed w-screen h-screen text-white">
      <div
        className="flex flex-col h-full bg-no-repeat bg-cover bg-center bg-fixed justify-between"
        style={{ backgroundImage: bgUrl }}
      >
        <Header />
        <div className="flex-grow overflow-auto">{children}</div>
        <Footer />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        theme="light"
      />
    </main>
  );
};

export default CustomLayout;
