import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

function Auth({ onLoginSuccess, onCancel }) {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState('login'); // 'login' or 'register'

    // Input states
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailOrPhone, setEmailOrEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        // Basic Validation
        if (!emailOrPhone || !password) {
            setError('Please fill in all required fields.');
            return;
        }

        if (activeTab === 'register') {
            if (!firstName || !lastName) {
                setError('Please enter your first and last name.');
                return;
            }
            if (password !== confirmPassword) {
                setError('Passwords do not match.');
                return;
            }
        }

        // Simulate successful login/registration
        const mockUser = {
            first_name: activeTab === 'register' ? firstName : "Yhlas",
            last_name: activeTab === 'register' ? lastName : "Meredow",
            role: "client" // Can be client, seller, admin
        };

        onLoginSuccess(mockUser);
    };

    return (
        <div className="auth-page-container">
            <div className="auth-card">
                {/* Close Button back to home */}
                <button className="auth-back-btn" onClick={onCancel}>✕</button>

                {/* Form Tabs */}
                <div className="auth-tabs">
                    <button
                        className={`auth-tab-btn ${activeTab === 'login' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('login'); setError(''); }}
                    >
                        {t('login')}
                    </button>
                    <button
                        className={`auth-tab-btn ${activeTab === 'register' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('register'); setError(''); }}
                    >
                        {t('register')}
                    </button>
                </div>

                {/* Validation Errors alert */}
                {error && <div className="auth-error-alert">⚠️ {error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    {activeTab === 'register' && (
                        <div className="auth-row-double">
                            <div className="form-group">
                                <label>{t('messages.FirstName')}</label>
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="Yhlas"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>{t('messages.LastName')}</label>
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Meredow"
                                    required
                                />
                            </div>
                        </div>
                    )}

                    <div className="form-group">
                        <label>{t('messages.PhoneOrEmail')}</label>
                        <input
                            type="text"
                            value={emailOrPhone}
                            onChange={(e) => setEmailOrEmailOrPhone(e.target.value)}
                            placeholder="example@market.com / +993..."
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>{t('messages.Password')}</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {activeTab === 'register' && (
                        <div className="form-group">
                            <label>{t('messages.ConfirmPassword')}</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    )}

                    {activeTab === 'login' && (
                        <div className="form-group-checkbox">
                            <input
                                type="checkbox"
                                id="remember"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <label htmlFor="remember">{t('messages.RememberMe')}</label>
                        </div>
                    )}

                    <button type="submit" className="btn btn-primary auth-submit-btn">
                        {activeTab === 'login' ? t('login') : t('register')}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Auth;