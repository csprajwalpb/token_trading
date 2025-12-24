import { Token, SortDirection, SortField } from '@/lib/types';
import { TokenRow } from './TokenRow';
import { cn } from '@/lib/utils';
import { Rocket, Trophy, Zap, ArrowUp, ArrowDown } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface TokenColumnProps {
    title: string;
    type: 'new' | 'final' | 'migrated';
    tokens: Token[];
    className?: string;
    isLoading?: boolean;
    onSort?: (field: SortField) => void;
    sortField?: SortField;
    sortDirection?: SortDirection;
}

export const TokenColumn = ({
    title,
    type,
    tokens,
    className,
    isLoading,
    onSort,
    sortField,
    sortDirection
}: TokenColumnProps) => {
    const getIcon = () => {
        switch (type) {
            case 'new': return <Zap className="h-5 w-5 text-yellow-500" />;
            case 'final': return <Rocket className="h-5 w-5 text-axiom-purple" />;
            case 'migrated': return <Trophy className="h-5 w-5 text-axiom-green" />;
        }
    };

    const SortIcon = ({ field }: { field: SortField }) => {
        if (sortField !== field) return null;
        return sortDirection === 'asc' ? <ArrowUp className="h-3 w-3 inline ml-1" /> : <ArrowDown className="h-3 w-3 inline ml-1" />;
    };

    const HeaderItem = ({ label, field, className }: { label: string, field: SortField, className?: string }) => (
        <div
            className={cn("text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors select-none", className)}
            onClick={() => onSort?.(field)}
        >
            {label}
            <SortIcon field={field} />
        </div>
    );

    return (
        <div className={cn("flex flex-col h-full", className)}>
            <div className="flex items-center gap-2 mb-2 p-2 bg-muted/20 rounded-t-md border-b border-border/50 backdrop-blur-sm sticky top-0 z-20">
                {getIcon()}
                <h2 className="font-bold text-lg tracking-tight">{title}</h2>
                <span className="ml-auto text-xs font-mono text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                    {isLoading ? "..." : tokens.length}
                </span>
            </div>

            <div className="flex items-center justify-between px-4 py-2 bg-muted/10 border-b border-border/30 text-[10px] sm:text-xs">
                <HeaderItem label="Token" field="symbol" />
                <div className="flex gap-4">
                    <HeaderItem label="Vol" field="volume24h" />
                    <HeaderItem label="Chg" field="change24h" />
                    <HeaderItem label="Price" field="price" />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-1 min-h-0 custom-scrollbar p-1">
                {isLoading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="flex items-center justify-between p-3 mb-2 rounded-lg border border-border/50 bg-card/50">
                            <div className="flex items-center gap-3">
                                <Skeleton className="h-10 w-10 rounded-full" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-20" />
                                    <Skeleton className="h-3 w-16" />
                                </div>
                            </div>
                            <div className="space-y-2 flex flex-col items-end">
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-3 w-12" />
                            </div>
                        </div>
                    ))
                ) : tokens.length === 0 ? (
                    <div className="h-32 flex items-center justify-center text-muted-foreground text-sm italic border border-dashed rounded-lg mt-4">
                        No tokens found
                    </div>
                ) : (
                    tokens.map((token) => (
                        <TokenRow key={token.id} token={token} />
                    ))
                )}
            </div>
        </div>
    );
};
