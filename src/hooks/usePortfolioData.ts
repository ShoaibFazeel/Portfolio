import { useState, useEffect, useMemo } from 'react';
import { client, GROQ_QUERY } from '../lib/sanity';
import type { PortfolioData } from '../types';

export const usePortfolioData = () => {
    const [data, setData] = useState<PortfolioData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!client) {
                setError(new Error('Sanity Project ID is missing or invalid. Please check your .env file.'));
                setLoading(false);
                return;
            }

            try {
                const result = await client.fetch(GROQ_QUERY);
                if (result) {
                    setData(result);
                }
            } catch (err) {
                console.error('Sanity fetch error:', err);
                setError(err instanceof Error ? err : new Error('Unknown error'));
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Memoize the data to prevent unnecessary re-renders in consumers
    const memoizedData = useMemo(() => data, [data]);

    return { data: memoizedData, loading, error };
};
