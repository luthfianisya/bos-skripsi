import {
  Application,
  Chart,
  Components,
  DashBoard,
  Stacks2,
  Map,
  Grid,
  Files,
  Graph,
  ClipBoard,
  Cart,
  Envelope,
  Messages,
  Monitor,
  ListFill,
  Calendar,
  Flag,
  Book,
  Note,
  ClipBoard2,
  Note2,
  Note3,
  BarLeft,
  BarTop,
  ChartBar,
  PretentionChartLine,
  PretentionChartLine2,
  Google,
  Pointer,
  Map2,
  MenuBar,
  Icons,
  ChartArea,
  Building,
  Building2,
  Sheild,
  Error,
  Diamond,
  Heroicon,
  LucideIcon,
  CustomIcon,
  Mail,
  Phone,
  User,
  Info,
  Bank,
  UserGroup,
  BuildingLib,
  Dashboard2,
} from "@/components/svg";


export interface MenuItemProps {
  title: string;
  icon: any;
  href?: string;
  child?: MenuItemProps[];
  megaMenu?: MenuItemProps[];
  multi_menu? : MenuItemProps[]
  nested?: MenuItemProps[]
  onClick: () => void;

  
}

export const menusConfig = {
  mainNav: [
      {
      title: "blank",
      icon: DashBoard,
      href: "/blank",
      onClick: () => {},
    },
  ],
  sidebarNav: {
    modern: [
      {
        title: "blank",
        icon: DashBoard,
        href: "/blank",
        onClick: () => {},
      },
    ],
    classic: [
      {
        title: "Dashboard",
        icon: Dashboard2,
        href: "/administrator/dashboard",
        onClick: () => {},
      },
      {
        title: "Kepegawaian",
        icon: UserGroup,
        child: [
          {
            title: "Data Pegawai",
            href: "/administrator/data-pegawai",
            onClick: () => {},
          },
          {
            title: "Data Mitra/PPNPN",
            href: "/administrator/data-mitra",
            onClick: () => {},
          },
          {
            title: "Presensi",
            multi_menu: [
              {
                title: "Presensi Unit Kerja",
                icon: "heroicons:information-circle",
                href: "/administrator/presensi-unit-kerja",
                onClick: () => {},
              },
              {
                title: "Presensi Mitra/PPNPN",
                icon: "heroicons:information-circle",
                href: "/administrator/presensi-mitra-ppnpn",
                onClick: () => {},
              },
            ]
          }
        ],
      },
      {
        title: "Anggaran",
        icon: BuildingLib,
        child: [
          {
            title: "Entri Pembiayaan",
            href: "/auth/login",
            onClick: () => {},
          },
        ],
      },
      {
        title: "Permintaan",
        icon: Envelope,
        child: [
          {
            title: "Form Permintaan",
            multi_menu: [
              {
                title: "Translok Biasa",
                icon: "heroicons:information-circle",
                href: "/accordion",
                onClick: () => {},
              },
            ]
          },
          {
            title: "Approval Permintaan",
            href: "/auth/login2",
            onClick: () => {},
          },
        ],
      },
      {
        title: "Keuangan",
        icon: Bank,
        child: [
          {
            title: "Realisasi Permintaan",
            multi_menu: [
              {
                title: "Translok Biasa",
                href: "/accordion",
                onClick: () => {},
              },
            ]
          },
          {
            title: "Rekap Bendahara",
            href: "/auth/login2",
            onClick: () => {},
          },
        ],
      },
      {
        title: "Pusat Bantuan",
        icon: Info,
        child: [
          {
            title: "Kontak Admin",
            href: "/auth/login2",
            onClick: () => {},
          },
          {
            title: "Knowledge Base",
            href: "/auth/login2",
            onClick: () => {},
          },
        ],
      },
    ],
  },
};


export type ModernNavType = (typeof menusConfig.sidebarNav.modern)[number]
export type ClassicNavType = (typeof menusConfig.sidebarNav.classic)[number]
export type MainNavType = (typeof menusConfig.mainNav)[number]