export const trayService = {
  filterProductsByGroup: (allProducts: any[], allowedCategoryIds: string[]) => {
    if (!allowedCategoryIds || allowedCategoryIds.length === 0) return [];
    return allProducts.filter(p => allowedCategoryIds.includes(p.trayCategoryId));
  },

  mapCategories: (categories: any[]) => {
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
