import { useRef, useEffect } from 'react';

/**
 * Here's a custom hook that just provides a boolean flag
 * to indicate whether the current render is the first render
 * (when the component was mounted).
 * Useful in cases where you don't have an initial state or want to ignore it
 * @useIsMount
 * @return boolean
 * */

const useIsMount = () => {
    const isMountRef = useRef(true);
    useEffect(() => {
        isMountRef.current = false;
    }, []);
    return isMountRef.current;
};

export default useIsMount;
