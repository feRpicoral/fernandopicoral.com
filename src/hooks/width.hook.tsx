import { useEffect, useState } from 'react';

/**
 * Returns the current width of the inner window
 */
const useWidth = () => {
    const [width, setWidth] = useState(Number.MAX_SAFE_INTEGER);

    useEffect(() => {
        const calculateWidth = () => setWidth(window.innerWidth);
        calculateWidth();

        window.addEventListener('resize', calculateWidth);
        return () => window.removeEventListener('resize', calculateWidth);
    }, []);

    return width;
};

export default useWidth;
