import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: 'Home', to: 'hero' },
        { name: 'About', to: 'about' },
        { name: 'Skills', to: 'skills' },
        { name: 'Projects', to: 'projects' },
        { name: 'Certificates', to: 'certificates' },
        { name: 'Contact', to: 'contact' },
    ];

    const closeMobileMenu = () => setMobileMenuOpen(false);

    return (
        <motion.nav
            className={`navbar ${scrolled ? 'scrolled' : ''}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="navbar-container">
                <motion.div
                    className="navbar-logo"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <span className="logo-text">Portfolio</span>
                </motion.div>

                {/* Desktop Menu */}
                <ul className="navbar-menu desktop-menu">
                    {navItems.map((item, index) => (
                        <motion.li
                            key={item.to}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link
                                to={item.to}
                                spy={true}
                                smooth={true}
                                offset={-70}
                                duration={500}
                                className="nav-link"
                                activeClass="active"
                            >
                                {item.name}
                            </Link>
                        </motion.li>
                    ))}
                </ul>



                {/* Mobile Menu Button */}
                <button
                    className="mobile-menu-btn"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? <FaTimes /> : <FaBars />}
                </button>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            className="mobile-menu"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ul className="mobile-menu-list">
                                {navItems.map((item, index) => (
                                    <motion.li
                                        key={item.to}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 + index * 0.1 }}
                                    >
                                        <Link
                                            to={item.to}
                                            spy={true}
                                            smooth={true}
                                            offset={-70}
                                            duration={500}
                                            className="mobile-nav-link"
                                            activeClass="active"
                                            onClick={closeMobileMenu}
                                        >
                                            {item.name}
                                        </Link>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav >
    );
};

export default Navbar;
