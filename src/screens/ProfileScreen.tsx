import React from 'react';
import { User, Mail, Lock, LogIn } from 'lucide-react';

export const ProfileScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-surface dark:bg-surface-dark p-4">
      <div className="flex flex-col items-center justify-center pt-12 pb-8">
        <div className="w-24 h-24 bg-accent dark:bg-accent-dark rounded-full flex items-center justify-center mb-4">
          <User size={48} className="text-white" />
        </div>
        <h1 className="text-xl font-bold text-text-high dark:text-text-high-dark mb-2">
          Welcome to Bite Bolt
        </h1>
        <p className="text-text-body dark:text-text-body-dark text-center mb-8">
          Sign in to view your orders, save your favorite restaurants, and more.
        </p>
      </div>

      <div className="max-w-md mx-auto">
        <div className="bg-white dark:bg-surface-dark rounded-lg border border-stroke dark:border-stroke-dark shadow-hover overflow-hidden mb-4">
          <div className="p-4">
            <div className="flex items-center gap-3 mb-4">
              <Mail size={20} className="text-text-subtle dark:text-text-subtle-dark" />
              <input 
                type="email" 
                placeholder="Email address"
                className="w-full bg-transparent border-b border-stroke dark:border-stroke-dark py-2 text-text-high dark:text-text-high-dark focus:outline-none focus:border-accent dark:focus:border-accent-dark"
              />
            </div>
            <div className="flex items-center gap-3 mb-6">
              <Lock size={20} className="text-text-subtle dark:text-text-subtle-dark" />
              <input 
                type="password" 
                placeholder="Password"
                className="w-full bg-transparent border-b border-stroke dark:border-stroke-dark py-2 text-text-high dark:text-text-high-dark focus:outline-none focus:border-accent dark:focus:border-accent-dark"
              />
            </div>
            <button className="w-full bg-accent dark:bg-accent-dark text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2">
              <LogIn size={18} />
              Sign In
            </button>
          </div>
        </div>

        <div className="text-center">
          <p className="text-text-body dark:text-text-body-dark mb-2">
            Don't have an account?
          </p>
          <button className="text-accent dark:text-accent-dark font-medium">
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};