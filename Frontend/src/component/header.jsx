import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../features/auth/hooks/useAuth";
import "./header.scss";

const Header = () => {
    const { user, handleLogout } = useAuth();
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    const initial =
        user?.username?.charAt(0)?.toUpperCase() || "U";

    const goHome = () => {
        setOpen(false);
        navigate("/");
    };

    const goLogin = () => {
        setOpen(false);
        navigate("/login");
    };

    const goRegister = () => {
        setOpen(false);
        navigate("/register");
    };

    const handleLogoutClick = async () => {
        setOpen(false);
        await handleLogout();
    };

    return (
        <header className="app-header">
            <div className="app-header__container">

                <button
                    type="button"
                    className="app-header__brand"
                    onClick={goHome}
                >
                    <span className="brand-icon">
                        💼
                    </span>

                    <span className="brand-content">
                        <span className="brand-name">
                            Career<span>Fit</span>
                        </span>

                        <span className="brand-tagline">
                            AI Job Analyzer
                        </span>
                    </span>
                </button>

                <nav className="app-header__nav">

                    <button
                        type="button"
                        className="nav-link nav-link--active"
                        onClick={goHome}
                    >
                        <span className="nav-icon">⌂</span>
                        <span>Home</span>
                    </button>

                    {user ? (
                        <>
                            <button
                                type="button"
                                className="nav-link"
                                onClick={goHome}
                            >
                                <span className="nav-icon">▤</span>
                                <span>My Plans</span>
                            </button>

                            <button
                                type="button"
                                className="nav-link"
                                onClick={goHome}
                            >
                                <span className="nav-icon">▥</span>
                                <span>Analytics</span>
                            </button>

                            <button
                                type="button"
                                className="nav-link"
                            >
                                <span className="nav-icon">▢</span>
                                <span>Resources</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                type="button"
                                className="nav-link"
                                onClick={goLogin}
                            >
                                <span>Login</span>
                            </button>

                            <button
                                type="button"
                                className="nav-link"
                                onClick={goRegister}
                            >
                                <span>Register</span>
                            </button>
                        </>
                    )}

                </nav>

                {user && (
                    <div className="app-header__profile">

                        <button
                            type="button"
                            className="profile-button"
                            onClick={() => setOpen((prev) => !prev)}
                        >
                            <span className="profile-avatar">
                                {initial}
                            </span>

                            <span className="profile-user-info">
                                <span className="profile-name">
                                    {user.username}
                                </span>

                                <span className="profile-role">
                                    Career Explorer
                                </span>
                            </span>

                            <span
                                className={`profile-arrow ${open ? "profile-arrow--open" : ""
                                    }`}
                            >
                                ▾
                            </span>
                        </button>

                        {open && (
                            <div className="profile-dropdown">

                                <div className="dropdown-profile">

                                    <div className="dropdown-avatar">
                                        {initial}
                                    </div>

                                    <div className="dropdown-user">

                                        <strong>
                                            {user.username}
                                        </strong>

                                        <span>
                                            {user.email}
                                        </span>

                                        <span className="career-badge">
                                            <span className="badge-dot"></span>
                                            Career Explorer
                                        </span>

                                    </div>

                                </div>

                                <div className="dropdown-divider"></div>

                                <button
                                    type="button"
                                    className="dropdown-item"
                                    onClick={goHome}
                                >
                                    <span className="dropdown-item-icon">
                                        ⌂
                                    </span>

                                    <span className="dropdown-item-content">
                                        <strong>
                                            Dashboard
                                        </strong>

                                        <small>
                                            Overview &amp; insights
                                        </small>
                                    </span>

                                    <span className="dropdown-arrow">
                                        ›
                                    </span>
                                </button>

                                <button
                                    type="button"
                                    className="dropdown-item"
                                    onClick={goHome}
                                >
                                    <span className="dropdown-item-icon">
                                        ▤
                                    </span>

                                    <span className="dropdown-item-content">
                                        <strong>
                                            My Interview Plans
                                        </strong>

                                        <small>
                                            View and manage your plans
                                        </small>
                                    </span>

                                    <span className="dropdown-arrow">
                                        ›
                                    </span>
                                </button>

                                <button
                                    type="button"
                                    className="dropdown-item"
                                    onClick={() => setOpen(false)}
                                >
                                    <span className="dropdown-item-icon">
                                        ♙
                                    </span>

                                    <span className="dropdown-item-content">
                                        <strong>
                                            Career Profile
                                        </strong>

                                        <small>
                                            Your account information
                                        </small>
                                    </span>

                                    <span className="dropdown-arrow">
                                        ›
                                    </span>
                                </button>

                                <button
                                    type="button"
                                    className="dropdown-item"
                                    onClick={() => setOpen(false)}
                                >
                                    <span className="dropdown-item-icon">
                                        ⚙
                                    </span>

                                    <span className="dropdown-item-content">
                                        <strong>
                                            Settings
                                        </strong>

                                        <small>
                                            Preferences &amp; privacy
                                        </small>
                                    </span>

                                    <span className="dropdown-arrow">
                                        ›
                                    </span>
                                </button>

                                <div className="dropdown-divider"></div>

                                <button
                                    type="button"
                                    className="logout-button"
                                    onClick={handleLogoutClick}
                                >
                                    <span className="logout-icon">
                                        ↪
                                    </span>

                                    <span>
                                        Logout
                                    </span>
                                </button>

                            </div>
                        )}

                    </div>
                )}

            </div>
        </header>
    );
};

export default Header;