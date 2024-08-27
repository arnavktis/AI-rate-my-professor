import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { IconMessage, IconList, IconMenu2, IconX, IconBrandOpenai, IconLogout } from '@tabler/icons-react';
import Image from 'next/image';

const SidebarLink = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => (
  <Link href={href} className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200">
    <div className="text-gray-400">{icon}</div>
    <span className="text-sm font-medium text-gray-200">{label}</span>
  </Link>
);

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsOpen(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: '-100%' },
  };

  return (
    <>
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md"
        >
          {isOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
        </button>
      )}

      <motion.div
        initial={isMobile ? "closed" : "open"}
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        transition={{ duration: 0.3 }}
        className={`fixed left-0 top-0 h-full w-64 bg-gray-900 text-white p-4 z-40 ${
          isMobile ? 'shadow-lg' : ''
        } border-r border-gray-700`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center space-x-3 mb-8">
            <IconBrandOpenai size={32} className="text-blue-500" />
            <span className="text-xl font-bold">RMP AI</span>
          </div>
          
          <div className="space-y-4 flex-grow">
            <SidebarLink href="/chatbot" icon={<IconMessage size={20} />} label="AI Chatbot" />
            <SidebarLink href="/professors" icon={<IconList size={20} />} label="Professors List" />
          </div>
          
          <div className="mt-auto border-t border-gray-700 pt-4">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-700">
                <Image src="/default-avatar.png" alt="User Avatar" width={40} height={40} />
              </div>
              <div>
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-gray-400">john@example.com</p>
              </div>
            </div>
            <button className="flex items-center space-x-3 p-2 w-full hover:bg-gray-700 rounded-lg transition-colors duration-200">
              <IconLogout size={20} className="text-gray-400" />
              <span className="text-sm font-medium text-gray-200">Logout</span>
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};