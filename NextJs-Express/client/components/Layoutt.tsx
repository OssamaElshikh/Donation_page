// components/Layout.tsx
import { ReactNode } from 'react';
import Link from 'next/link';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-58 bg-gray-700 text-white h-screen p-4 sticky top-0">
        <ul>
          <li className="mb-4">
          <a href="/" className="text-white hover:text-gray-400">Donations</a>

          </li>
          <li className="mb-4">
            <a href="#" className="text-white hover:text-gray-400">Payment & Fees</a>
          </li>
          <li className="mb-4">
            <a href="#" className="text-white hover:text-gray-400">Personal Information</a>
          </li>
          <li className="mb-4">
            <a href="#" className="text-white hover:text-gray-400">Tribute</a>
          </li>
          <li className="mb-4">
            <a href="#" className="text-white hover:text-gray-400">Comment</a>
          </li>
          <li className="mb-4">
            <a href="#" className="text-white hover:text-gray-400">Source</a>
          </li>
          <li className="mb-4">
            <a href="#" className="text-white hover:text-gray-400">Custom Fields</a>
          </li>
          <li className="mb-4">
            <a href="#" className="text-white hover:text-gray-400">Emails</a>
          </li>
          <li className="mb-4">
            <a href="#" className="text-white hover:text-gray-400">Transactions</a>
          </li>
          <li className="mb-4">
            <a href="#" className="text-white hover:text-gray-400">Double the Donation</a>
          </li>
        </ul>
      </div>
      
      {/* Main Content */}
      <div className="flex-grow p-4">
        {children}
      </div>
    </div>
  );
};

export default Layout;
