export interface User {
  id: number;
  role: number;
  email: string;
  name: string;
  lastName: string;
  password: string;
  books: UserBook[];
}

export interface UserBook {
  id: number;
  title: string;
  ammount: number;
}
