import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <p className="footer-text">
                        © {new Date().getFullYear()} BACHHAV PRITESH. All rights reserved.
                    </p>
                    <p className="footer-subtext">
                        Built with React & Framer Motion
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
