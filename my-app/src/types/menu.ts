export interface MenuItem {
  name: string;
  image: string;
  calories?: number;
}

export interface MenuSection {
  title: string;
  items: MenuItem[];
}

export interface Settings {
  pageTitle: string;
  dateFormat: string;
  menuSections: MenuSection[];
  madeByText: string;
}

