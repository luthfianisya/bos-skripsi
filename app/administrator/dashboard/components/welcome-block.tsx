"use client"
import Image from "next/image";
import admin from "@/public/images/all-img/admin.png"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import slider1 from "@/public/images/all-img/slider-1.png";
// import Autoplay from "embla-carousel-autoplay";
import { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const WelcomeBlock = () => {
  const data = [
    {
      title: "Today's Task",
      total: "123"
    },
    {
      title: "Overdue Task",
      total: "213"
    },
  ]
  const [activeIndex, setActiveIndex] = useState(0);

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="w-full h-full bg-primary rounded-md flex p-6 relative gap-x-6 items-start">
      {/* Bagian Kiri: Welcome Text */}
      <div className="flex-1">
        <div className="text-lg md:text-2xl font-semibold text-primary-foreground mb-6">
          Welcome Back <br />
          Luthfiani Nur Aisyah, S.Tr.Stat!
        </div>
        {/* <div className="flex flex-col gap-4 sm:flex-row">
        {data.map((item, index) => (
          <div
            key={`welcome-text-${index}`}
            className="flex items-center w-full max-w-[130px] p-3 rounded bg-primary-foreground/10 shadow backdrop-blur-sm"
          >
            <div className="flex-1">
              <div className="text-xs font-semibold text-primary-foreground/80">{item.title}</div>
              <div className="text-lg font-semibold text-primary-foreground">{item.total}</div>
            </div>
          </div>
        ))}
      </div> */}
      </div>

      {/* Gambar Admin (Di Tengah, Antara Teks & Carousel) */}
      <div className="pr-2">
        <div className="relative w-[100px] md:w-[100px] min-w-[100px] ">
          <Image src={admin} alt="user" className="w-full h-full object-cover" priority={true} />
        </div>
      </div>

      {/* Carousel (Di Kanan) */}
      {/* <div className="px-0">
        <Carousel
          className="w-full max-w-3xl"
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
          opts={{
            align: "start",
          }}
        >
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem className="w-full" key={index}>
                <div className="p-1">
                  <div className="flex aspect-square items-center justify-center h-[300px] w-full">
                    <Image
                      className="w-full h-full object-cover rounded-lg"
                      src={slider1}
                      alt="image"
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* <CarouselPrevious className="bg-white"/>
      <CarouselNext className="bg-white"/> */}
        {/* </Carousel> */}
      {/* </div> */} 
      <div className="max-w-3xl w-full h-auto">
        <Swiper
          pagination={{ clickable: true, dynamicBullets: true}}
          modules={[Pagination, Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          spaceBetween={20}
          slidesPerView={1}
          // className="w-full"
        >
          {[...Array(5)].map((_, index) => (
            <SwiperSlide key={index} className="flex justify-center">
              <div className=" max-h-[175px] rounded-lg overflow-hidden">
                <Image
                  src={slider1}
                  alt={`Slide ${index + 1}`}
                  // layout="" // Mengikuti ukuran asli
                  // width={800} // Sesuaikan dengan ukuran asli gambarnya
                  height={200}
                  className="object-contain w-full h-auto" // Hindari pemotongan
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

    </div>

  );
};

export default WelcomeBlock;