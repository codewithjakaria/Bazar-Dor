export interface Category {
  slug: string;
  name: string;
  icon: string;
}

export interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  unit: 'kg' | 'litre' | 'dozen' | 'piece';
  image: string;
  today: number;
  change: {
    dir: 'up' | 'down' | 'flat';
    pct: number;
  };
}
