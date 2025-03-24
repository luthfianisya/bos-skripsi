import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Tipe data menu item
interface MenuItem {
  title: string;
  href: string;
}

// Store State
interface MenuStoreState {
  sidebarMenu: MenuItem[];
  addMenu: (menuItem: MenuItem) => void;
  resetMenu: () => void; // Opsional: kalo mau reset ke menu default
}

export const useMenuStore = create<MenuStoreState>()(
  persist(
    (set, get) => ({
      sidebarMenu: [
        {
          title: "Form Permintaan",
          href: "/administrator/form-permintaan",
        },
        {
          title: "Approval Permintaan",
          href: "/auth/login2",
        },
      ],

      addMenu: (menuItem) => {
        const existingMenu = get().sidebarMenu;
        const isExist = existingMenu.find((item) => item.title === menuItem.title);

        if (!isExist) {
          set({
            sidebarMenu: [...existingMenu, menuItem],
          });
        }
      },

      resetMenu: () => {
        set({
          sidebarMenu: [
            {
              title: "Form Permintaan",
              href: "/administrator/form-permintaan",
            },
            {
              title: "Approval Permintaan",
              href: "/auth/login2",
            },
          ],
        });
      },
    }),
    {
      name: "menu-store", // Storage key
      storage: createJSONStorage(() => localStorage),
    }
  )
);
