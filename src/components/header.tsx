import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';

const Header = ({ selectedCrypto, selectedFiat }) => {
    const [darkMode, setDarkMode] = useState(false);

    // Toggle between light and dark modes
    const toggleTheme = () => {
        setDarkMode(!darkMode);
        if (!darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    useEffect(() => {
        // Check system preference for dark mode on component mount
        const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        setDarkMode(prefersDarkMode);
        if (prefersDarkMode) {
            document.documentElement.classList.add('dark');
        }
    }, []);

    return (
        <div className="px-6 inset-x-0 w-full h-20 border-b border-gray-400 dark:border-gray-600 flex justify-between items-center">
            <a href="/" className="hover:bg-gray-100 transition-all hover:text-slate-800 duration-300 border border-gray-100 dark:border-gray-600 text-black dark:text-white text-2xl px-1">
                SEED
            </a>
            <div className="flex gap-1 text-2xl text-black dark:text-white">
                <div className="font-bold">{selectedCrypto}</div> to <div className="font-bold">{selectedFiat}</div>
            </div>
            <div className="flex items-center gap-2">
                {/* Dark mode toggle button */}
                <button
                    className={`p-1.5 transition-all duration-300 group border rounded-md ${darkMode ? 'bg-slate-800 border-slate-600 hover:bg-slate-600' : 'bg-gray-100 border-gray-400 hover:bg-gray-200'}`}
                    onClick={toggleTheme}
                >
                    <Icon
                        icon={darkMode ? 'circum:dark' : 'circum:light'}
                        className={`text-2xl ${darkMode ? 'text-gray-200 group-hover:text-slate-800' : 'text-slate-800 group-hover:text-gray-200'}`}
                    />
                </button>

                {/* Other icons/buttons */}
                <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 group border border-slate-600 rounded-md">
                    <Icon icon="mdi:cog" className="text-2xl text-gray-200 group-hover:text-slate-800" />
                </button>
                <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 group border border-slate-600 rounded-md">
                    <Icon icon="fe:warning" className="text-2xl text-gray-200 group-hover:text-slate-800" />
                </button>
            </div>
        </div>
    );
};

export default Header;
