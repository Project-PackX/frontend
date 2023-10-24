import React from 'react';

import "./footer.css"

export const Footer = () => {
    return (
        <footer className="bg-dark text-light text-center py-3 custom-footer">
            <div className="container">
            <p>&copy; {new Date().getFullYear()} PackX - All rights reserved - <a href="/policy">Terms and conditions</a></p>
            </div>
        </footer>
    );
}
