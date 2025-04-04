"use client";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useThemeStore } from "@/store";
import { useTheme } from "next-themes";
import { themes } from "@/config/thems";

const MonAnggaranWilayah = ({ height = 400 }) => {
  const { theme: config, isRtl } = useThemeStore();
  const { theme: mode } = useTheme();
  const theme = themes.find((theme) => theme.name === config);

  // Kabupaten & Kota di Jawa Barat (Total 27)
  const kabkotJabar = [
    "Prov. Jawa Barat",
    "Kab. Bogor",
    "Kab. Sukabumi",
    "Kab. Cianjur",
    "Kab. Bandung",
    "Kab. Garut",
    "Kab. Tasikmalaya",
    "Kab. Ciamis",
    "Kab. Kuningan",
    "Kab. Cirebon",
    "Kab. Majalengka",
    "Kab. Sumedang",
    "Kab. Indramayu",
    "Kab. Subang",
    "Kab. Purwakarta",
    "Kab. Karawang",
    "Kab. Bekasi",
    "Kab. Bandung Barat",
    "Kab. Pangandaran",
    "Kota Bogor",
    "Kota Sukabumi",
    "Kota Bandung",
    "Kota Cirebon",
    "Kota Bekasi",
    "Kota Depok",
    "Kota Cimahi",
    "Kota Tasikmalaya",
  ];

  // Fungsi untuk membuat angka acak dalam rentang yang lebih dekat
  const getRandomNumber = (min: number, max: number) => 
    Math.floor(Math.random() * (max - min + 1)) + min;

  // Pagu di rentang 7000 - 9000 agar lebih dekat antar data
  const paguData = kabkotJabar.map(() => getRandomNumber(7000, 9000));
  const bookedData = paguData.map((pagu) => Math.floor(pagu * 0.1)); // 10% dari Pagu
  const realisasiData = paguData.map((pagu) => Math.floor(pagu * 0.3)); // 30% dari Pagu

  const series = [
    { name: "Realisasi", data: realisasiData },
    { name: "Booked", data: bookedData },
    { name: "Pagu", data: paguData },
  ];

  const options: any = {
    chart: {
      toolbar: { show: false },
      stacked: true,
    },
    plotOptions: {
      bar: {
        borderRadius: 2,
        columnWidth: "25%",
      },
    },
    dataLabels: { enabled: false },
    stroke: {
      show: false,
      width: 1,
      colors: theme?.cssVars
        ? [`hsl(${theme.cssVars[mode === "dark" ? "dark" : "light"].chartLabel})`]
        : ["#000"],
    },
    colors: ["#22C55E", "#3B82F6", "#BFDBFE" ],
    tooltip: {
      theme: mode === "dark" ? "dark" : "light",
    },
    grid: {
      position: "back",
      borderColor: theme?.cssVars
        ? `hsl(${theme.cssVars[mode === "dark" ? "dark" : "light"].chartGird})`
        : "#E5E7EB",
    },
    yaxis: {
      labels: {
        style: {
          colors: theme?.cssVars
            ? `hsl(${theme.cssVars[mode === "dark" ? "dark" : "light"].chartLabel})`
            : "#000",
          fontSize: "12px",
        },
      },
    },
    xaxis: {
      categories: kabkotJabar,
      labels: {
        rotate: -45, // Agar tidak bertabrakan
        style: {
          colors: theme?.cssVars
            ? `hsl(${theme.cssVars[mode === "dark" ? "dark" : "light"].chartLabel})`
            : "#000",
          fontSize: "12px",
        },
      },
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "12px",
      fontWeight: 500,
      labels: {
        colors: theme?.cssVars
          ? `hsl(${theme.cssVars[mode === "dark" ? "dark" : "light"].chartLabel})`
          : "#000",
      },
      itemMargin: { horizontal: 10, vertical: 8 },
      markers: {
        width: 10,
        height: 10,
        radius: 10,
        offsetX: isRtl ? 5 : -5,
      },
    },
  };

  return (
    <Chart
      options={options}
      series={series}
      type="bar"
      height={height}
      width={"100%"}
    />
  );
};

export default MonAnggaranWilayah;
