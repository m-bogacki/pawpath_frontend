import { TAddress } from "./Address";

export type TUser = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  role: number;
  phone_number: number;
  address: TAddress;
};
