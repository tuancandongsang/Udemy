export class Todo {
  push(arg0: any) {
    throw new Error("Method not implemented.");
  }
  id: number;
  name: string;
  username: string;
  email: string;
  address: object;
  phone: string;
  website: string;
  company: object;
  done: boolean;

  constructor({
    id = undefined,
    name = "",
    username = "",
    email = "",
    address = {},
    phone = "",
    website = "",
    company = {},
    done = false,
  }: Partial<Todo>) {
    this.id = id ?? Math.floor(Math.random() * 10000);
    this.name = name;
    this.username = username;
    this.email = email;
    this.address = address;
    this.phone = phone;
    this.website = website;
    this.company = company;
    this.done = done;
  }
}
export interface StateItem {
  status: string;
  id: number;
}

export interface NotiType{
  type: string;
  message: string;
  description: string;
}
