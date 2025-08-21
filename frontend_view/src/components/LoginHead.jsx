import React from 'react'
import { useState, useEffect } from "react";
import './Headnav.css';
import { Search, ShoppingCart, User, Menu, Star, Heart, Filter, TrendingUp, Zap, Package, Truck, LogOut, Settings, UserCircle, Bell, ChevronDown } from 'lucide-react';

function LoginHead({user, onLogout}) {

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.profile-dropdown-container')) {
        setShowProfileDropdown(false);
      }
    };

    if (showProfileDropdown) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showProfileDropdown]);

  return (
    <div>
      <header className="header">
        <div className="container">
          <div className="header-content">
            {/* Logo */}
            <div className="logo-section">
              <div className="logo-icon">
                <Package className="h-8 w-8 text-white" />
              </div>
              <div className="logo-text">
                <h1>ScrapeFlow</h1>
                <p>Best deals, all platforms</p>
              </div>
            </div>

            <div className="actions-section">
              {/* Profile Dropdown */}
              <div className="profile-dropdown-container">
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="profile-button"
                >
                  <div className="profile-avatar">
                    <User className="h-5 w-5" />
                  </div>
                  <ChevronDown className={`chevron ${showProfileDropdown ? 'rotated' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {showProfileDropdown && (
                  <div className="dropdown-menu">
                    {/* User Info Section */}
                    <div className="user-info">
                      <div className="user-info-content">
                        
                        <div className="user-details">
                          <h3>{user.username}</h3>
                          <p>{user.email}</p>
                        </div>
                      </div>
                    </div>

                    {/* Logout Section */}
                    <div className="logout-section">
                      <button 
                      onClick={onLogout}
                        className="logout-button"
                      >
                        <span className="logout-text" >Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export default LoginHead