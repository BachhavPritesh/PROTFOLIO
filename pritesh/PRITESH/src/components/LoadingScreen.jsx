import { motion } from 'framer-motion';

const LoadingScreen = () => {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: '#0c0c0c',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 9999,
            }}
        >
            <div style={{ width: '150px', height: '150px', position: 'relative' }}>
                <motion.svg
                    viewBox="0 0 100 100"
                    initial="hidden"
                    animate="visible"
                    style={{ width: '100%', height: '100%' }}
                >
                    {/* Geometric Stem */}
                    <motion.rect
                        x="32"
                        y="20"
                        width="8"
                        height="60"
                        fill="var(--accent-color)"
                        initial={{ scaleY: 0, originY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 0.8, ease: "circOut" }}
                    />

                    {/* Aesthetic Hex-Loop */}
                    <motion.path
                        d="M40 20 L65 20 L75 35 L65 50 L40 50"
                        fill="transparent"
                        stroke="var(--accent-color)"
                        strokeWidth="8"
                        strokeLinecap="square"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
                    />

                    {/* Glowing Accents (Data Points) */}
                    <motion.circle
                        cx="40"
                        cy="20"
                        r="3"
                        fill="white"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 1.5 }}
                    />
                    <motion.circle
                        cx="75"
                        cy="35"
                        r="3"
                        fill="white"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 1.7 }}
                    />

                    {/* Background Orbitals */}
                    <motion.circle
                        cx="50"
                        cy="50"
                        r="48"
                        stroke="var(--accent-color)"
                        strokeWidth="0.5"
                        fill="transparent"
                        strokeDasharray="10 5"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    />
                </motion.svg>

                {/* Core Glow */}
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '100px',
                        height: '100px',
                        background: 'var(--accent-color)',
                        filter: 'blur(50px)',
                        borderRadius: '50%',
                        zIndex: -1,
                    }}
                />
            </div>
        </motion.div>
    );
};

export default LoadingScreen;
