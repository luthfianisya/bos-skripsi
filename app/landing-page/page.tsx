
"use client"
import Image from "next/image";
import background from "@/public/images/auth/landing-page-3.png";
import LockForm from "./lock-form";

const LandingPage = () => {

  return (
    <div className="loginwrapper flex items-center min-h-screen w-full bg-gradient-to-br from-[#004AAD] to-[#8F6CE6]">

      <div className="lg-inner-column flex w-full flex-wrap justify-center lg:justify-end overflow-y-auto py-10">

        {/* SVG sebelah kiri */}
        <div className="hidden lg:flex lg:basis-1/2 justify-center items-center">
          <Image
            src={background}
            alt="Login Illustration"
            className="w-full max-w-6xl object-contain"
          />

        </div>

        {/* Form sebelah kanan */}
        <div className="basis-full lg:basis-[45%] w-full flex justify-end items-center relative lg:pr-12 xl:pr-20 2xl:pr-[110px] px-5">
          <div className="w-full md:w-[440px] xl:w-[570px] px-5 py-7 md:p-10 lg:p-16 bg-background rounded-xl shadow-lg">
            <LockForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
