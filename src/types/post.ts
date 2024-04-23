export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  rating: 1 | 0 | -1;
}
