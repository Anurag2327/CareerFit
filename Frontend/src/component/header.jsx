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

    const handleLogoutClick = async () => {
        setOpen(false);
        await handleLogout();
    };

    if (!user) return null;

    return (
        <header className="app-header">
            <div className="app-header__container">

                {/* ================= BRAND ================= */}

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


                {/* ================= NAVIGATION ================= */}

                <nav className="app-header__nav">

                    {/* Home */}
                    <button
                        type="button"
                        className="nav-link nav-link--active"
                        onClick={goHome}
                    >
                        <span className="nav-icon">⌂</span>
                        <span>Home</span>
                    </button>


                    {/* My Plans */}
                    <button
                        type="button"
                        className="nav-link"
                        onClick={goHome}
                    >
                        <span className="nav-icon">▤</span>
                        <span>My Plans</span>
                    </button>


                    {/* Analytics */}
                    <button
                        type="button"
                        className="nav-link"
                        onClick={goHome}
                    >
                        <span className="nav-icon">▥</span>
                        <span>Analytics</span>
                    </button>


                    {/* Resources */}
                    <button
                        type="button"
                        className="nav-link"
                    >
                        <span className="nav-icon">▢</span>
                        <span>Resources</span>
                    </button>

                </nav>


                {/* ================= PROFILE ================= */}

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
                            className={`profile-arrow ${
                                open
                                    ? "profile-arrow--open"
                                    : ""
                            }`}
                        >
                            ▾
                        </span>
                    </button>


                    {/* ================= PROFILE DROPDOWN ================= */}

                    {open && (
                        <div className="profile-dropdown">

                            {/* User Information */}

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


                            {/* Dashboard */}

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


                            {/* Interview Plans */}

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


                            {/* Career Profile */}

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


                            {/* Settings */}

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


                            {/* Logout */}

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

            </div>
        </header>
    );
};

export default Header;