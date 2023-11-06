export type User = {
  email: string;
  firstName: string;
  role: number;
  phoneNumber: number;
};

export type Dog = {
  id?: number;
  species: "Dog" | "Cat";
  name: string;
  owner: User | number;
};
