export interface Book {
  id: number;
  title: string;
  year: Date;
  url: string;
  imageUrl: string;
  inStock: number;
  authors: string[];
}
