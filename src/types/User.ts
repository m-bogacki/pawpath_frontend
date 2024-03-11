import { TAddress } from "./Address";

type TUserRoles = 1 | 2 | 3;

export type TUser = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  role: TUserRoles;
  phone_number: number;
  address: TAddress;
};
