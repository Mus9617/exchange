

export interface Crypto {
    id: string;
    name: string;
    value: number;
    image: string;
    quantity: number;
    created_at: string;
    updated_at: string;
  }
  
 export interface UserHasCrypto {
    Crypto: Crypto;
    amount: number;
    id: string;
  }
  
 export interface UserAssets {
    firstName: string;
    lastName: string;
    dollarAvailables: number;
    pseudo: string;
    age: number;
    UserHasCrypto: UserHasCrypto[];
  }
  