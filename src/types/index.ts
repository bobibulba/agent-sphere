export interface Agent {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  price: string;
  likes: number; // Changed from rating
  reviewCount: number;
  creator: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  capabilities: string[];
  requirements: string[];
  useCases: string[];
  reviews: Review[];
  details?: {
    longDescription?: string;
    useCases?: string[];
    requirements?: string[];
    version?: string;
    lastUpdated?: string;
  };
}

export interface Review {
  id: string;
  user: string;
  avatar: string;
  liked: boolean; // Changed from rating
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
  sortBy?: 'popular' | 'price' | 'newest' | 'mostLiked'; // Changed rating to mostLiked
  capabilities?: string[];
}
