import { Token } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PriceCell } from './PriceCell';
import { cn } from '@/lib/utils';
import { Heart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TokenRowProps {
    token: Token;
    onClick?: (id: string) => void;
}

export const TokenRow = ({ token, onClick }: TokenRowProps) => {
    return (
        <Card
            className={cn(
                "group relative flex items-center justify-between p-3 mb-2 transition-all duration-200 hover:bg-muted/50 hover:shadow-md cursor-pointer border-border/50",
                "animate-in fade-in slide-in-from-bottom-2"
            )}
            onClick={() => onClick?.(token.id)}
        >
            <div className="flex items-center gap-3">
                <div className="h-10 w-10 overflow-hidden rounded-full bg-secondary/50 flex items-center justify-center text-xs font-bold ring-1 ring-border">
                    {token.logoUrl ? (
                        <img src={token.logoUrl} alt={token.symbol} className="h-full w-full object-cover" />
                    ) : (
                        token.symbol.substring(0, 2)
                    )}
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <span className="font-semibold">{token.symbol}</span>
                        <span className="text-xs text-muted-foreground">{token.name}</span>
                        {token.verified && (
                            <Badge variant="secondary" className="h-4 px-1 text-[10px]">VERIFIED</Badge>
                        )}
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                        <span className="text-muted-foreground">Vol: ${(token.volume24h / 1000).toFixed(1)}k</span>
                        <span className={cn("font-medium", {
                            "text-axiom-green": token.change24h > 0,
                            "text-axiom-red": token.change24h < 0,
                        })}>
                            {token.change24h > 0 ? '+' : ''}{token.change24h.toFixed(2)}%
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <PriceCell price={token.price} className="font-mono font-medium" />

                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 absolute right-2 bg-gradient-to-l from-background via-background to-transparent pl-4">
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-primary">
                        <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-primary">
                        <ArrowRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </Card>
    );
};
