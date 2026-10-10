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
  categoryNameBn: string;
  unit: 'kg' | 'litre' | 'dozen' | 'piece';
  image: string;
  today: number;
  yesterday: number;
  change: {
    dir: 'up' | 'down' | 'flat';
    pct: number;
  };
  markets: {
    market: string;
    division: string;
    min: number;
    max: number;
  }[];
}
