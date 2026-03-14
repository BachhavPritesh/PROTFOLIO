import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import './Loader.css';

const Loader = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading time
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    className="loader-container"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="loader-content">
                        {/* Animated Logo/Icon */}
                        <motion.div
                            className="loader-logo"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <motion.div
                                className="loader-ring"
                                animate={{ rotate: 360 }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: 'linear',
                                }}
                            />
                            <motion.div
                                className="loader-ring loader-ring-2"
                                animate={{ rotate: -360 }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: 'linear',
                                }}
                            />
                            <div className="loader-center">
                                <span className="loader-text">P</span>
                            </div>
                        </motion.div>

                        {/* Loading Text */}
                        <motion.div
                            className="loader-message"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                        >
                            <h2>Loading Portfolio</h2>
                            <div className="loader-dots">
                                <motion.span
                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                    transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                                >
                                    .
                                </motion.span>
                                <motion.span
                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                                >
                                    .
                                </motion.span>
                                <motion.span
                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                                >
                                    .
                                </motion.span>
                            </div>
                        </motion.div>

                        {/* Progress Bar */}
                        <motion.div
                            className="loader-progress-container"
                            initial={{ opacity: 0, scaleX: 0 }}
                            animate={{ opacity: 1, scaleX: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                        >
                            <motion.div
                                className="loader-progress-bar"
                                initial={{ width: '0%' }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 2, ease: 'easeInOut' }}
                            />
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Loader;
