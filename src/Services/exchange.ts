export interface Offer {
    User: {
      pseudo: string;
    };
    amount: number;
    created_at: string;
    id_user: string;
    Crypto: {
      id: string;
      name: string;
      value: number;
      image: string;
      quantity: number;
      created_at: string;
      updated_at: string;
    };
  }

  
  
export interface ApiErrorResponse {
    message: string;
  }
  