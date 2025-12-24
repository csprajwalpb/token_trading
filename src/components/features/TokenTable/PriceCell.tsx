import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface PriceCellProps {
    price: number;
    className?: string;
    format?: (value: number) => string;
}

export const PriceCell = ({ price, className, format }: PriceCellProps) => {
    const prevPriceRef = useRef(price);
    const [flashColor, setFlashColor] = useState<'green' | 'red' | null>(null);

    useEffect(() => {
        if (price > prevPriceRef.current) {
            setFlashColor('green');
        } else if (price < prevPriceRef.current) {
            setFlashColor('red');
        }
        prevPriceRef.current = price;

        const timer = setTimeout(() => {
            setFlashColor(null);
        }, 1000); // 1s flash duration

        return () => clearTimeout(timer);
    }, [price]);

    const formattedPrice = format ? format(price) : `$${price.toFixed(4)}`;

    return (
        <div className={cn("relative transition-colors duration-300", className, {
            "text-axiom-green": flashColor === 'green',
            "text-axiom-red": flashColor === 'red',
        })}>
            {formattedPrice}
        </div>
    );
};
