import { motion } from 'framer-motion';

const LoadingScreen = () => {
    const text = "PRITESH BACHHAV".split("");

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1, 
            transition: { 
                staggerChildren: 0.04, 
                delayChildren: 1.1 
            } 
        }
    };

    const letterVariants = {
        hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
        visible: { 
            opacity: 1, 
            y: 0, 
            filter: 'blur(0px)',
            transition: { type: "spring", damping: 12, stiffness: 200 } 
        }
    };

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
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 9999,
                overflow: 'hidden'
            }}
        >
            {/* The Dropping Ball */}
            <motion.div
                initial={{ y: '-60vh', scale: 1 }}
                animate={{ 
                    y: 0, 
                    scale: [1, 1, 1, 3, 0], 
                    opacity: [1, 1, 1, 0.5, 0] 
                }}
                transition={{ 
                    y: { type: "spring", bounce: 0.5, duration: 1 },
                    scale: { times: [0, 0.7, 0.9, 0.95, 1], duration: 1.3 },
                    opacity: { times: [0, 0.7, 0.9, 0.95, 1], duration: 1.3 }
                }}
                style={{
                    width: '35px',
                    height: '35px',
                    borderRadius: '50%',
                    background: 'var(--accent-color)',
                    boxShadow: '0 0 50px var(--accent-color)',
                    position: 'absolute',
                    zIndex: 2
                }}
            />

            {/* Impact Ripple */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 10], opacity: [0, 0.6, 0] }}
                transition={{ delay: 1.0, duration: 0.8, ease: "easeOut" }}
                style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    border: '2px solid var(--accent-color)',
                    position: 'absolute',
                    zIndex: 1
                }}
            />

            {/* Core Background Glow */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.3, 0] }}
                transition={{ delay: 1.1, duration: 2 }}
                style={{
                    position: 'absolute',
                    width: '300px',
                    height: '100px',
                    background: 'var(--accent-color)',
                    filter: 'blur(80px)',
                    zIndex: 0
                }}
            />

            {/* The Name */}
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{
                    display: 'flex',
                    fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                    fontWeight: '900',
                    fontFamily: "'Syne', sans-serif",
                    letterSpacing: '4px',
                    textTransform: 'uppercase',
                    zIndex: 10
                }}
            >
                {text.map((char, index) => {
                    const isAccent = index >= 8; // "PRITESH " is 8 chars, "BACHHAV" starts at 8
                    return (
                        <motion.span 
                            key={index} 
                            variants={letterVariants}
                            style={{ 
                                display: 'inline-block',
                                marginRight: char === " " ? '2vw' : '0',
                                color: isAccent ? 'var(--accent-color)' : '#ffffff',
                                textShadow: isAccent ? '0 0 20px rgba(163, 255, 0, 0.3)' : 'none'
                            }}
                        >
                            {char}
                        </motion.span>
                    );
                })}
            </motion.div>
        </motion.div>
    );
};

export default LoadingScreen;
