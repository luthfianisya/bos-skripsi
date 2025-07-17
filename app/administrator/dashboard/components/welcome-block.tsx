"use client";
import Image from "next/image";
import admin from "@/public/images/all-img/admin.png";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Icon } from "@iconify/react";
import slider1 from "@/public/images/all-img/coba.png";
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
    <div className="w-full relative overflow-hidden rounded-2xl shadow-lg bg-gradient-to-br from-[#004AAD] to-[#8F6CE6] p-6">
      {/* SVG Background */}
      <svg className="absolute top-[-80px] left-[-80px] w-[300px] h-[300px] opacity-10 z-0" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="100" fill="white" />
      </svg>
      <svg className="absolute bottom-[-60px] right-[-60px] w-[200px] h-[200px] opacity-10 z-0" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r="100" fill="white" />
      </svg>

      {/* Grid Utama */}
      <div className="relative z-10 grid lg:grid-cols-2 gap-6">
        {/* Kolom Kiri */}
        <div className="flex flex-col justify-between">
          {/* Atas: Welcome + CTA + Avatar */}
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="text-xl md:text-4xl font-semibold text-primary-foreground mb-3 leading-snug">
                Welcome Back <br />
                Aldi Pratama, S.Tr.Stat!
              </div>

              <div className="flex items-center gap-2 text-sm text-white bg-white/20 px-4 py-2 rounded-xl w-fit shadow-sm backdrop-blur-sm">
                <Icon icon="solar:clock-circle-bold" className="w-4 h-4" />
                <span>{currentTime}</span>
              </div>
              <br />
              <div className="text-base text-white leading-relaxed">
                BackOffice Selindo (BOS) merupakan aplikasi yang terintegrasi dalam menyertai siklus APBN di lingkungan Badan Pusat Statistik
              </div>
              {/* CTA Box */}

            </div>

            {/* Avatar */}
            <div className="min-w-[120px]">
              <Image src={admin} alt="admin" className="w-full object-contain" />
            </div>
          </div>

          {/* Bawah: Deskripsi dan Jam */}
          <div className="mt-6 flex flex-col gap-2">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-white text-sm font-medium shadow-sm flex justify-between items-center">
              <div className="flex items-center justify-between gap-4 flex-wrap lg:flex-nowrap">
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <Icon icon="heroicons:question-mark-circle" className="w-5 h-5" />
                  Ada kendala atau baru pertama kali?
                </div>
                <div className="flex flex-wrap gap-3">
                  <button className="bg-white text-[#004AAD] font-semibold text-sm px-4 py-2 rounded-md hover:bg-gray-100 transition">
                    Panduan Penggunaan
                  </button>
                  <button className="bg-white/20 border border-white text-white font-semibold text-sm px-4 py-2 rounded-md hover:bg-white/30 transition">
                    Hubungi Admin
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Kolom Kanan: Swiper */}
        <div className="flex items-center justify-center">
          <div className="w-full">
            <Swiper
              pagination={{ clickable: true, dynamicBullets: true }}
              modules={[Pagination, Autoplay]}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              spaceBetween={20}
              slidesPerView={1}
              className="rounded-xl"
            >
              {[...Array(3)].map((_, index) => (
                <SwiperSlide key={index} className="flex justify-center">
                  <div className="w-full aspect-[16/9] rounded-xl overflow-hidden border-4 border-white shadow-md">
                    <Image src={slider1} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBlock;
