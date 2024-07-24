export interface IUser {
  _id: string;
  image: {
    data: Buffer;
    contentType: String;
  };
  email: string;
  userName: string;
  firstName: string;
  lastName: string;
  password: string;
  role: string;
  status: number;

  shipping: {
    firstName: string;
    lastName: string;
    card: string;
  };

  credit: {
    firstName: string;
    lastName: string;
    card: string;
  };
}
