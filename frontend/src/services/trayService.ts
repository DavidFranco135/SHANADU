import axios from 'axios';

/* ============================
   TIPAGENS
============================ */
export type TrayCategory = {
  id: string;
  name: string;
};

export type Product = {
  id: string;
  name: string;
  trayCategoryId: string;
  price?: number;
};

export type BusinessContext = {
  sellerId: string;
  sellerEmail: string;
  allowedCnpjs: string[];
  allowedCategoryIds: string[];
  groupName: string;
};

/* ============================
   SERVICE
============================ */
export const trayService = {

  /* ---------- CONTEXTO DO VENDEDOR ---------- */
  fetchTrayBusinessContext: async (email: string, token: string): Promise<BusinessContext> => {
    // 🔐 Aqui é onde você liga vendedor → regras de negócio
    // No futuro isso vem de backend / firebase / api
    // Por enquanto mock estruturado (mas já funcional)

    return {
      sellerId: email,
      sellerEmail: email,
      allowedCnpjs: [
        '12345678000100',
        '99887766000155'
      ],
      allowedCategoryIds: [
        '10',
        '20',
        '30'
      ],
      groupName: 'premium'
    };
  },

  /* ---------- CATEGORIAS DISPONÍVEIS ---------- */
  getAvailableCategories: (allCategories: TrayCategory[], allowedCategoryIds: string[]): TrayCategory[] => {
    if (!allowedCategoryIds || allowedCategoryIds.length === 0) return [];
    return allCategories.filter(cat => allowedCategoryIds.includes(String(cat.id)));
  },

  /* ---------- PRODUTOS POR GRUPO ---------- */
  filterProductsByGroup: (allProducts: Product[], allowedCategoryIds: string[]): Product[] => {
    if (!allowedCategoryIds || allowedCategoryIds.length === 0) return [];
    return allProducts.filter(p => allowedCategoryIds.includes(String(p.trayCategoryId)));
  },

  /* ---------- MAPEAMENTO ---------- */
  mapCategories: (categories: any[]): TrayCategory[] => {
    return categories.map(c => ({
      id: String(c.id),
      name: c.name
    }));
  },

  /* ---------- GRUPOS ---------- */
  getGroupName: (groupName?: string): string => {
    if (!groupName) return 'default';
    return groupName;
  },

  getGroupLabel: (groupName?: string): string => {
    if (!groupName) return 'Padrão';
    if (groupName === 'vip') return 'VIP';
    if (groupName === 'premium') return 'Premium';
    return 'Padrão';
  },

  getGroupColor: (groupName?: string) => {
    if (!groupName) return 'bg-slate-500';
    if (groupName === 'vip') return 'bg-purple-600';
    if (groupName === 'premium') return 'bg-emerald-600';
    return 'bg-blue-600';
  }

};
