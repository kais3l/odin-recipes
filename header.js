import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

export default function Header() {
  const location = useLocation();

 
  const getISTTime = () => {
    const options = {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    };
    
    
    const formatter = new Intl.DateTimeFormat('en-IN', options);
    const parts = formatter.formatToParts(new Date());
    const d = Object.fromEntries(parts.map(p => [p.type, p.value]));
    return `${d.year}-${d.month}-${d.day} ${d.hour}:${d.minute}:${d.second}`;
  };

  
  const [time, setTime] = useState(getISTTime());

  useEffect(() => {
    
    const t = setInterval(() => {
      setTime(getISTTime());
    }, 1000);
    
   
    return () => clearInterval(t);
  }, []);

  const navLinks = [
    { to: '/', label: 'Dashboard' },
    { to: '/sessions', label: 'Sessions' },
    { to: '/events', label: 'Events' },
  ];

  return (
    <header className="header">
      <div className="logo-group">
        <div className="logo-hex">
          <svg width="42" height="42" viewBox="0 0 42 42">
            <polygon points="21,2 38,11.5 38,30.5 21,40 4,30.5 4,11.5" fill="none" stroke="#00c8b4" strokeWidth="1.2" opacity=".6"/>
            <polygon points="21,7 34,14.5 34,29.5 21,37 8,29.5 8,14.5" fill="rgba(0,200,180,0.06)" stroke="#00c8b4" strokeWidth=".6" opacity=".4"/>
          </svg>
          <span className="hex-letter">P</span>
        </div>
        <div className="logo-text">
          <div className="logo-title">Polymorphinate</div>
          <div className="logo-sub">Honeypot Intelligence · v2.4.1</div>
        </div>
      </div>

      <nav className="nav">
        {navLinks.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className={`nav-link ${location.pathname === to ? 'active' : ''}`}
          >
            {label}
          </Link>
        ))}
      </nav>

      <div className="header-right">
        <div className="live-group">
          <div className="live-dot" />
         
          <span className="live-time">{time} IST</span>
        </div>
        <div className="status-pill status-active">Active</div>
        <div className="status-pill status-alert">⚠ Intrusion</div>
      </div>
    </header>
  );
}
