export interface Token {
    id: string;
    symbol: string;
    name: string;
    price: number;
    change24h: number;
    volume24h: number;
    marketCap: number;
    holders: number;
    verified: boolean;
    logoUrl?: string;
    status: 'new' | 'final' | 'migrated';
    createdAt: string;
}

export interface WebSocketMessage {
    type: 'PRICE_UPDATE' | 'NEW_TOKEN' | 'STATUS_CHANGE';
    data: Partial<Token>;
}

export type SortField = 'symbol' | 'price' | 'change24h' | 'volume24h' | 'marketCap' | 'createdAt';
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
    field: SortField;
    direction: SortDirection;
}
