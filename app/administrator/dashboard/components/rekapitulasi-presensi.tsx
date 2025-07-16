"use client";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useThemeStore } from "@/store";
import { useTheme } from "next-themes";
import { themes } from "@/config/thems";

const RekapitulasiPresensi = ({ height = 400 }) => {
    const { theme: config, isRtl } = useThemeStore();
    const { theme: mode } = useTheme();
    const theme = themes.find((theme) => theme.name === config);

    const bulanLabels = [
        "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
        "Jul", "Agu", "Sep", "Okt", "Nov", "Des"
    ];

    const getRandom = (min: number, max: number) =>
        Math.floor(Math.random() * (max - min + 1)) + min;

    // Dummy data presensi per bulan (dalam orang-hari)
    // Dummy data presensi per bulan (total maksimal 600 orang-hari/bulan)
    const hadirData = bulanLabels.map(() => getRandom(500, 580));
    const dinasData = bulanLabels.map(() => getRandom(5, 20));
    const cutiData = bulanLabels.map(() => getRandom(10, 40));
    const tkData = bulanLabels.map(() => getRandom(0, 10));

    const series = [
        { name: "Hadir", data: hadirData },
        { name: "Dinas", data: dinasData },
        { name: "Cuti", data: cutiData },
        { name: "TK", data: tkData },
    ];

    const options: any = {
        chart: {
            toolbar: { show: false },
            stacked: true,
        },
        plotOptions: {
            bar: {
                borderRadius: 2,
                columnWidth: "30%",
            },
        },
        dataLabels: { enabled: false },
        stroke: {
            show: false,
        },
        colors: ["#3B82F6", "#BFDBFE", "#FFEDD5", "#F43F5E"], // Hadir, Dinas, Cuti, TK
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter: function (val: number) {
                    return `${val} orang-hari`;
                },
            },
        },
        grid: {
            position: "back",
            borderColor: theme?.cssVars
                ? `hsl(${theme.cssVars[mode === "dark" ? "dark" : "light"].chartGird})`
                : "#E5E7EB",
        },
        yaxis: {
            min: 0,
            max: 700,
            tickAmount: undefined, // biar Apex bebas
            forceNiceScale: false,
            labels: {
                formatter: (val: number) => {
                    return [0, 100, 200, 300, 400, 500, 600, 700].includes(val) ? val : "";
                },
                style: {
                    fontSize: "12px",
                    colors: "#000",
                },
            },
            title: {
                text: "Orang-Hari",
                style: {
                    fontSize: "12px",
                    fontWeight: 500,
                },
            },
        },
        xaxis: {
            categories: bulanLabels,
            labels: {
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

export default RekapitulasiPresensi;
