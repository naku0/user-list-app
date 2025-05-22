export interface ShortUser{
  id: number,
  name: string,
  email: string,
}
export interface User extends ShortUser{
  username: string,
  address: {
    city: string,
    street: string,
  }
  phone: string,
  website: string,
  company: {
    name: string,
    bs: string,
    catchPhrase: string,
  }
}
