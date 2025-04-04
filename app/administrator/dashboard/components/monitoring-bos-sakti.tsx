"use client";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useThemeStore } from "@/store";
import { useTheme } from "next-themes";
import { themes } from "@/config/thems";

const MonBosSakti = ({ height = 400 }) => {
    const { theme: config, isRtl } = useThemeStore();
    const { theme: mode } = useTheme();
    const theme = themes.find((theme) => theme.name === config);

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

    // Fungsi angka random dalam rentang lebih dekat
    const getRandomNumber = (min: number, max: number) =>
        Math.floor(Math.random() * (max - min + 1)) + min;

    // Data Pagu BOS & SAKTI
    const paguSakti = kabkotJabar.map(() => getRandomNumber(8000, 10000));
    const paguBos = paguSakti.map((pagu) => Math.floor(pagu * 1.1)); // 11:10 dari SAKTI
    const realisasiBos = paguBos.map((pagu) => Math.floor(pagu * 0.3)); // 30% dari Pagu BOS
    const realisasiSakti = paguSakti.map((pagu) => Math.floor(pagu * 0.3)); // 30% dari Pagu SAKTI

    const series = [
        { name: "Realisasi BOS", group: "BOS", data: realisasiBos },
        { name: "Realisasi SAKTI", group: "SAKTI", data: realisasiSakti },
        { name: "Pagu BOS", group: "BOS", data: paguBos, borderRadius: 5},
        { name: "Pagu SAKTI", group: "SAKTI", data: paguSakti, borderRadius: 5 },
    ];

    const options: any = {
        chart: { toolbar: { show: false }, stacked: true },
        plotOptions: { bar: { borderRadius: 0, columnWidth: "50%" } },
        dataLabels: {
            enabled: false,
            style: { fontSize: "12px", colors: ["#000"] },
            formatter: (val: number) => `${val / 1000}K`,
        },
        stroke: { show: false, width: 1 },
        colors: [
            "#3B82F6", // Pagu SAKTI: blue-500
            "#10B981", // Realisasi SAKTI: green-500
            "#BFDBFE", // Pagu BOS: blue-200
            "#A7F3D0", // Realisasi BOS: green-200
        ],
        tooltip: { theme: "light" },
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

    return <Chart options={options} series={series} type="bar" height={height} width={"100%"} />;
};

export default MonBosSakti;
