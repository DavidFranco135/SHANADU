// ❌ SEM axios
// ❌ SEM chamada direta pra Tray
// ✅ Só lógica de negócio e filtros

import { Product, TrayCategory } from '../types';

export const trayService = {

  filterProductsByGroup: (allProducts: Product[], allowedCategoryIds: string[]): Product[] => {
    if (!allowedCategoryIds || allowedCategoryIds.length === 0) return [];
    return allProducts.filter(p => allowedCategoryIds.includes(p.trayCategoryId));
  },

  mapCategories: (categories: any[]): TrayCategory[] => {
    return categories.map(c => ({
      id: String(c.id),
      name: c.name
    }));
  },

  getGroupLabel: (groupName?: string) => {
    if (!groupName) return 'Padrão';
    return groupName;
  },

  getGroupColor: (groupName?: string) => {
    if (!groupName) return 'bg-slate-500';
    if (groupName.includes('vip')) return 'bg-purple-600';
    if (groupName.includes('premium')) return 'bg-emerald-600';
    return 'bg-blue-600';
  }

};
