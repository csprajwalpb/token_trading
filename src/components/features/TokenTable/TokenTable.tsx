"use client";

import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTokens, updateToken, selectTokens, selectSortConfig, setSortConfig } from '@/store/tokensSlice';
import { webSocketService } from '@/services/websocket';
import { TokenColumn } from './TokenColumn';
import { Token, SortConfig, SortField } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/ui/error-boundary';

// Dummy fetch function
const fetchInitialTokens = async (): Promise<Token[]> => {
    // Generate some mock data
    return Array.from({ length: 30 }).map((_, i) => ({
        id: `token-${i}`,
        symbol: `TKN${i}`,
        name: `Token ${i}`,
        price: 0.1 + Math.random() * 100,
        change24h: (Math.random() - 0.5) * 20,
        volume24h: Math.random() * 1000000,
        marketCap: Math.random() * 10000000,
        holders: Math.floor(Math.random() * 1000),
        verified: Math.random() > 0.5,
        status: i < 8 ? 'new' : i < 20 ? 'final' : 'migrated',
        createdAt: new Date().toISOString(),
    }));
};

export const TokenTable = () => {
    const dispatch = useDispatch();
    const tokens = useSelector(selectTokens);
    const sortConfig = useSelector(selectSortConfig);

    const { data: initialData, isLoading } = useQuery({
        queryKey: ['tokens'],
        queryFn: fetchInitialTokens,
    });

    useEffect(() => {
        if (initialData) {
            dispatch(setTokens(initialData));
            webSocketService.connect(initialData);
        }
        return () => {
            webSocketService.disconnect();
        };
    }, [initialData, dispatch]);

    useEffect(() => {
        const unsubscribe = webSocketService.subscribe((message) => {
            if (message.type === 'PRICE_UPDATE' && message.data.id) {
                dispatch(updateToken(message.data as Partial<Token>));
            }
        });
        return unsubscribe;
    }, [dispatch]);

    const handleSort = (field: SortField) => {
        let direction: 'asc' | 'desc' = 'desc';
        if (sortConfig.field === field && sortConfig.direction === 'desc') {
            direction = 'asc';
        }
        dispatch(setSortConfig({ field, direction }));
    };

    const sortedTokens = useMemo(() => {
        const sorted = [...tokens];
        sorted.sort((a, b) => {
            const aValue = a[sortConfig.field];
            const bValue = b[sortConfig.field];

            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return sortConfig.direction === 'asc'
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue);
            }

            if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
        return sorted;
    }, [tokens, sortConfig]);

    const newTokens = sortedTokens.filter(t => t.status === 'new');
    const finalTokens = sortedTokens.filter(t => t.status === 'final');
    const migratedTokens = sortedTokens.filter(t => t.status === 'migrated');

    return (
        <ErrorBoundary>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100vh-140px)] min-h-[500px]">
                <TokenColumn
                    title="New Pairs"
                    type="new"
                    tokens={newTokens}
                    className="bg-card/40 rounded-xl border p-1 shadow-inner overflow-hidden"
                    isLoading={isLoading}
                    onSort={handleSort}
                    sortField={sortConfig.field}
                    sortDirection={sortConfig.direction}
                />
                <TokenColumn
                    title="Final Stretch"
                    type="final"
                    tokens={finalTokens}
                    className="bg-card rounded-xl border-t border-b p-1 shadow-2xl ring-1 ring-border/50 z-10 overflow-hidden"
                    isLoading={isLoading}
                    onSort={handleSort}
                    sortField={sortConfig.field}
                    sortDirection={sortConfig.direction}
                />
                <TokenColumn
                    title="Migrated"
                    type="migrated"
                    tokens={migratedTokens}
                    className="bg-card/40 rounded-xl border p-1 shadow-inner overflow-hidden"
                    isLoading={isLoading}
                    onSort={handleSort}
                    sortField={sortConfig.field}
                    sortDirection={sortConfig.direction}
                />
            </div>
        </ErrorBoundary>
    );
};
