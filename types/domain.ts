export interface Subcategory {
  name: string;
  displayName: string;
}

export interface Category {
  name: string;
  displayName: string;
  subcategories?: Subcategory[];
}

export interface DomainInfo {
  title: string;
  description: string;
  color: string;
  hasSubcategories: boolean;
  categories: Category[];
}

export interface Resource {
  id: number;
  title: string;
  description: string;
  type: string;
  author: string;
  date: string;
  downloads: number;
  views: number;
  image: string;
}
