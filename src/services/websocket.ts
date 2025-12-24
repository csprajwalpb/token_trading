import { Token, WebSocketMessage } from "@/lib/types";

type Listener = (message: WebSocketMessage) => void;

class MockWebSocketService {
    private listeners: Listener[] = [];
    private intervalId: NodeJS.Timeout | null = null;
    private tokens: Token[] = [];

    constructor() {
        // Initialize with some mock data if needed, or fetched externally
    }

    // Connect simulates opening a connection
    connect(initialTokens: Token[]) {
        this.tokens = initialTokens;
        this.startEmitting();
    }

    disconnect() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    subscribe(listener: Listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter((l) => l !== listener);
        };
    }

    private startEmitting() {
        if (this.intervalId) return;

        this.intervalId = setInterval(() => {
            this.emitRandomUpdate();
        }, 1000); // Update every second
    }

    private emitRandomUpdate() {
        if (this.tokens.length === 0) return;

        // Pick a random token to update
        const randomIndex = Math.floor(Math.random() * this.tokens.length);
        const token = this.tokens[randomIndex];

        // Simulate price change -1% to +1%
        const changePercent = (Math.random() - 0.5) * 0.02;
        const newPrice = token.price * (1 + changePercent);
        const newChange24h = token.change24h + (changePercent * 100);

        const update: WebSocketMessage = {
            type: 'PRICE_UPDATE',
            data: {
                id: token.id,
                price: newPrice,
                change24h: newChange24h,
            },
        };

        this.notifyListeners(update);
    }

    private notifyListeners(message: WebSocketMessage) {
        this.listeners.forEach((listener) => listener(message));
    }
}

export const webSocketService = new MockWebSocketService();
