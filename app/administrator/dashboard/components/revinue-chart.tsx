"use client";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useThemeStore } from "@/store";
import { useTheme } from "next-themes";
import { themes } from "@/config/thems";
import { getGridConfig, getYAxisConfig } from "@/lib/appex-chart-options";

const RevinueChart = ({ height = 100 }) => {
  const { theme: config, setTheme: setConfig, isRtl } = useThemeStore();
  const { theme: mode } = useTheme();

  const theme = themes.find((theme) => theme.name === config);

  const series = [
    {
      name: "Pagu Realisasi",
      data: [44],
    },
    {
      name: "Pagu Booked",
      data: [53],
    },
    {
      name: "Self Blocking",
      data: [40],
    },
    {
      name: "Pagu Sisa",
      data: [120],
    },
  ];
  const options:any = {
    chart: {
      toolbar: {
        show: false,
      },
      stacked: true,
      stackType: "100%",
      margin: 0, // Hapus margin default chart
      padding: 0, // Hapus padding default
    },
    plotOptions: {
      bar: {
        borderRadius: 12,
        horizontal: true,
        barHeight: "45%", // Kurangi tinggi bar agar lebih rapat
        columnWidth: "40%", // Atur agar tidak terlalu lebar
        dataLabels: {
          total: {
            enabled: false,
            offsetX: 0,
            style: {
              colors: [
                `hsl(${theme?.cssVars[
                  mode === "dark" || mode === "system" ? "dark" : "light"
                ].chartLabel
                })`,
              ],
              fontSize: "13px",
              fontWeight: 800,
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: false,
      width: 1,
      colors: [
        `hsl(${theme?.cssVars[
          mode === "dark" || mode === "system" ? "dark" : "light"
        ].chartLabel
        })`,
      ],
    },
    colors: [
      `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].success})`,
      `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].warning})`,
      `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].destructive})`,
      `hsl(${theme?.cssVars[mode === "dark" ? "dark" : "light"].secondary})`,
    ],
    tooltip: {
      theme: mode === "dark" ? "dark" : "light",
    },
    grid: { 
      show: false, 
      padding: { left: -5, right: -5, top: -30, bottom: -5 } // Kurangi padding grid
    },
    yaxis: {
      labels: { show: false }, // Menghilangkan label Y-Axis
      axisBorder: { show: false }, // Menghilangkan border Y-Axis
      axisTicks: { show: false }, // Menghilangkan ticks Y-Axis
    },
    xaxis: {
      categories: ["Distribusi Pagu"],
      labels: { show: false }, // Menghilangkan label X-Axis
      axisBorder: { show: false }, // Menghilangkan border X-Axis
      axisTicks: { show: false }, // Menghilangkan ticks X-Axis
    },

    legend: {
      position: "bottom",
      horizontalAlign: "left",
      fontSize: "12px",
      fontWeight: 500,
      labels: {
        colors: `hsl(${theme?.cssVars[
          mode === "dark" || mode === "system" ? "dark" : "light"
        ].chartLabel
          })`,
      },
      itemMargin: {
        horizontal: 10,
        vertical: 8,
      },
      markers: {
        width: 10,
        height: 10,
        radius: 50,
        offsetX: isRtl ? 5 : -5
      }
    }
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

export default RevinueChart;
