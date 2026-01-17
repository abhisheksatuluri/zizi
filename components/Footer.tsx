import React from 'react';
import { Instagram, Twitter, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full flex flex-col items-center justify-center bg-[#050505] text-white px-6 py-16 md:py-20">

      <div className="flex flex-col items-center space-y-16">

        {/* Social Icons */}
        <div className="flex space-x-12">
          <a href="#" className="text-white/50 hover:text-white transition-colors transform hover:-translate-y-1 duration-300">
            <Instagram size={24} strokeWidth={1} />
          </a>
          <a href="#" className="text-white/50 hover:text-white transition-colors transform hover:-translate-y-1 duration-300">
            <Twitter size={24} strokeWidth={1} />
          </a>
          <a href="#" className="text-white/50 hover:text-white transition-colors transform hover:-translate-y-1 duration-300">
            <Facebook size={24} strokeWidth={1} />
          </a>
        </div>

        {/* Small Text Links */}
        <div className="flex space-x-8 text-[10px] uppercase tracking-[0.2em] text-white/40">
          <a href="#" className="hover:text-white transition-colors">Shipping</a>
          <a href="#" className="hover:text-white transition-colors">Returns</a>
          <a href="#" className="hover:text-white transition-colors">Legal</a>
        </div>

        {/* Copyright */}
        <div className="text-center pt-12 border-t border-white/5 w-64">
          <p className="text-gray-600 text-[10px] tracking-[0.2em] uppercase font-medium">
            © 2025 ZIZI.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;