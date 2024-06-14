export type CryptoProps = {
    name: string,
    value: string,
    image: string,
    quantity: string,
    created_at: string,
    updated_at: string
}
  
export enum Roles {
    admin = 'ADMIN',
    user = 'USER',
    moderator = 'MODERATOR',
  }


  export type AnimalUpdateOrInsertProps = {
    
    name: string
    value: string
    image: string
    boxId: string
    quantity: string
    
  }