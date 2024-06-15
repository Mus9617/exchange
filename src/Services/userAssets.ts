export interface UserAsset {
    pseudo: string;
    firstName: string;
    lastName: string;
    dollarAvailables: number;
    UserHasCrypto: {
        Crypto: {
            id: string;
            name: string;
            image: string;
            value: number;
        };
        amount: number;
    }[];
}