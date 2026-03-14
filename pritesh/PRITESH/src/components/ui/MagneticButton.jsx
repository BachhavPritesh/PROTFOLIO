import React, { useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const MagneticButton = ({ children, className, onClick, style, strength = 15, ...props }) => {
    const ref = useRef(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 150 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        mouseX.set((clientX - centerX) * 0.4);
        mouseY.set((clientY - centerY) * 0.4);

        if (props.onMouseMove) {
            props.onMouseMove(e);
        }
    };

    const handleMouseLeave = (e) => {
        mouseX.set(0);
        mouseY.set(0);

        if (props.onMouseLeave) {
            props.onMouseLeave(e);
        }
    };

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            className={className}
            style={{ ...style, x, y }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default MagneticButton;
