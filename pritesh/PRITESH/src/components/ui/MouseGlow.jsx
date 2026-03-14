import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const MouseGlow = ({ containerRef, color = 'rgba(163, 255, 0, 0.05)', size = 600 }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation for the glow movement
    const springX = useSpring(mouseX, { damping: 50, stiffness: 400 });
    const springY = useSpring(mouseY, { damping: 50, stiffness: 400 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (containerRef?.current) {
                const rect = containerRef.current.getBoundingClientRect();
                mouseX.set(e.clientX - rect.left);
                mouseY.set(e.clientY - rect.top);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [containerRef, mouseX, mouseY]);

    return (
        <motion.div
            style={{
                position: 'absolute',
                top: springY,
                left: springX,
                width: `${size}px`,
                height: `${size}px`,
                background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
                borderRadius: '50%',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
                zIndex: 0, // Ensure it's behind content but visible
            }}
        />
    );
};

export default MouseGlow;
