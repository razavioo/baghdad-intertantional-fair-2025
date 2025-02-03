import React from 'react';

export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 py-4 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 flex justify-center">
        <a
          href="https://tajerun.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 dark:text-gray-300 hover:underline"
        >
          &copy; {new Date().getFullYear()} Tajerun.com
        </a>
      </div>
    </footer>
  );
}

export default Footer;
