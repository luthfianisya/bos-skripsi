"use client"
import Image from "next/image";
import admin from "@/public/images/all-img/admin.png";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Icon } from "@iconify/react";
import slider1 from "@/public/images/all-img/slider-1.png";
import "swiper/css";
import "swiper/css/pagination";
import dayjs from "dayjs";
import "dayjs/locale/id";

dayjs.locale("id");

const WelcomeBlock = () => {
  const [currentTime, setCurrentTime] = useState(
    dayjs().format("dddd, DD MMMM YYYY - HH:mm:ss")
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs().format("dddd, DD MMMM YYYY - HH:mm:ss"));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full min-h-[220px] relative overflow-hidden rounded-2xl shadow-lg flex p-6 gap-x-6 bg-gradient-to-r from-[#234C90] to-[#3B82F6]">
      {/* SVG Dekoratif */}
      <svg
        className="absolute top-[-80px] left-[-80px] w-[300px] h-[300px] opacity-10 z-0"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="100" cy="100" r="100" fill="white" />
      </svg>

      <svg
        className="absolute bottom-[-60px] right-[-60px] w-[200px] h-[200px] opacity-10 z-0"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="100" cy="100" r="100" fill="white" />
      </svg>

      {/* Konten utama */}
      <div className="relative z-10 flex-1 flex flex-col">
        <div className="text-xl md:text-4xl font-semibold text-primary-foreground mb-2">
          Welcome Back <br />
          Aldi Pratama, S.Tr.Stat!
        </div>



        <div className="flex-grow" />
        <div className="text-xl md:text-sm text-primary-foreground mb-2 pb-8">
          <br />
          <br />
          BackOffice Selindo (BOS) merupakan aplikasi yang terintegrasi dalam menyertai siklus APBN di
          lingkungan Badan Pusat Statistik
        </div>
        <div className="flex items-center gap-2 text-sm text-primary-foreground bg-white/20 px-4 py-2 rounded-xl w-fit shadow-sm backdrop-blur-sm">
          <Icon icon="solar:clock-circle-bold" className="w-4 h-4" />
          <span>{currentTime}</span>
        </div>
      </div>

      {/* Gambar Admin */}
      <div className="relative z-10 pr-2">
        <div className="relative w-[100px] md:w-[100px] min-w-[150px]">
          <Image
            src={admin}
            alt="user"
            className="w-full h-full object-cover"
            priority={true}
          />
        </div>
      </div>

      {/* Carousel */}
      {/* Carousel */}
      <div className=" shadow-md backdrop-blur-sm">
        <div className="relative z-10 w-full max-w-2xl"> {/* ← Lebar tetap */}
          <Swiper
            pagination={{ clickable: true, dynamicBullets: true }}
            modules={[Pagination, Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            spaceBetween={20}
            slidesPerView={1}
            className="rounded-lg"
          >
            {[...Array(5)].map((_, index) => (
              <SwiperSlide key={index} className="flex justify-center">
                <div className="w-full max-w-2xl aspect-[16/9] rounded-lg overflow-hidden border-4 border-white shadow-md">
                  <Image
                    src={slider1}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>

              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>


    </div >
  );
};

export default WelcomeBlock;
