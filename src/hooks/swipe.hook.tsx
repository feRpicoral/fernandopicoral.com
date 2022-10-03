import { useEffect, useState } from 'react';

export enum SwipeDirection {
    LEFT,
    RIGHT
}

/**
 * Detect the direction of the horizontal swipe performed by the used
 */
const useSwipe = () => {
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(0);

    useEffect(() => {
        document.addEventListener('touchstart', e => {
            setStart(e.changedTouches[0].screenX);
        });

        document.addEventListener('touchend', e => {
            setEnd(e.changedTouches[0].screenX);
        });
    }, []);

    const data = {
        direction: undefined,
        start,
        end
    };

    if (end < start) {
        return {
            ...data,
            direction: SwipeDirection.LEFT
        };
    } else if (end > start) {
        return {
            ...data,
            direction: SwipeDirection.RIGHT
        };
    }

    return data;
};

export default useSwipe;
