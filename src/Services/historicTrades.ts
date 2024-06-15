export interface Trade {
    Giver: {
      pseudo: string;
    };
    Receiver: {
      pseudo: string;
    };
    Crypto: {
      name: string;
    };
    quantity: number;
    created_at: string;
  }
  
 export interface ApiErrorResponse {
    message: string;
  }



  
export interface CryptoHistoryProps {
  cryptoId: string;
}

export interface HistoryData {
  updated_at: string;
  created_at: string
  value: number;
}