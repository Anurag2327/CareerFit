import React from "react";
import "./footer.scss";

const Footer = () => {
    return (
        <footer className="app-footer">

            <div className="app-footer__container">

                {/* Brand */}
                <div className="footer-brand">
                    <div className="footer-logo">
                        <span className="footer-logo-icon">✦</span>

                        <h2>
                            Career<span>Fit</span>
                        </h2>
                    </div>

                    <p className="footer-tagline">
                        AI Job Analyzer
                    </p>

                    <p className="footer-description">
                        Analyze your career fit, identify skill gaps,
                        and prepare smarter for your next opportunity.
                    </p>
                </div>


                {/* Product */}
                <div className="footer-column">
                    <h3>Product</h3>

                    <a href="#interview-plans">
                        Interview Plans
                    </a>

                    <a href="#technical">
                        Technical Questions
                    </a>

                    <a href="#behavioral">
                        Behavioral Questions
                    </a>

                    <a href="#roadmap">
                        Career Roadmap
                    </a>
                </div>


                {/* Resources */}
                <div className="footer-column">
                    <h3>Resources</h3>

                    <a href="#interview-prep">
                        Interview Preparation
                    </a>

                    <a href="#career-prep">
                        Career Preparation
                    </a>

                    <a href="#skill-gap">
                        Skill Gap Analysis
                    </a>

                    <a href="#help">
                        Help &amp; Support
                    </a>
                </div>


                {/* Legal */}
                <div className="footer-column">
                    <h3>Legal</h3>

                    <a href="#privacy">
                        Privacy Policy
                    </a>

                    <a href="#terms">
                        Terms &amp; Conditions
                    </a>
                </div>


                {/* Developer */}
                <div className="footer-column footer-developer">
                    <h3>Developer</h3>

                    <span className="developer-name">
                        Anurag Pandey
                    </span>

                    <a
                        href="https://anurag2327.netlify.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="portfolio-link"
                    >
                        Visit Portfolio
                        <span>↗</span>
                    </a>
                </div>

            </div>


            {/* Bottom */}
            <div className="footer-bottom">

                <span>
                    © 2026 <strong>CareerFit</strong>
                </span>

                <span className="footer-made">
                    Built with <span className="heart">♥</span> by
                    <strong>Anurag Pandey</strong>
                </span>

            </div>

        </footer>
    );
};

export default Footer;