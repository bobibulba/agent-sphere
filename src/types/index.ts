export interface Agent {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  price: string;
  rating: number;
  reviewCount: number;
  creator: string;
  createdAt: string;
  tags: string[];
  capabilities: string[];
  requirements: string[];
  useCases: string[];
  reviews: Review[];
}

export interface Review {
  id: string;
  user: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  count: number;
}

export interface SearchFilters {
  query?: string;
  category?: string;
  priceMin?: number;
  priceMax?: number;
  rating?: number;
  capabilities?: string[];
  sortBy?: 'popular' | 'price' | 'rating' | 'newest';
}
