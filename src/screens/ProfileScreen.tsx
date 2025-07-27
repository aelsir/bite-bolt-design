import React, { useState } from 'react';
import { User, LogIn, MapPin, Mail, Phone, Home, CheckCircle, Package, Apple, ArrowRight, Map, Edit2, Save, X as CloseIcon } from 'lucide-react';

const fakeUser = {
  name: 'Jane Doe',
  photo: 'https://randomuser.me/api/portraits/women/44.jpg',
  email: 'jane.doe@example.com',
  phone: '+44 1234 567890',
  addresses: [
    { id: 1, label: 'Home', address: '123 Main St, Manchester', isDefault: true },
    { id: 2, label: 'Work', address: '456 Office Rd, Manchester', isDefault: false },
    { id: 3, label: 'Parents', address: '789 Family Ave, Manchester', isDefault: false },
  ],
  orders: [
    { id: 1, date: '2024-06-01', total: 23.99, status: 'Delivered', items: 3 },
    { id: 2, date: '2024-05-20', total: 15.50, status: 'Delivered', items: 2 },
    { id: 3, date: '2024-05-10', total: 32.10, status: 'Cancelled', items: 4 },
  ]
};

const TABS = ['Personal Info', 'Addresses', 'Orders'];

export const ProfileScreen: React.FC = () => {
  const [signedIn, setSignedIn] = useState(false);
  const [tab, setTab] = useState(TABS[0]);
  const [editInfo, setEditInfo] = useState(false);
  const [email, setEmail] = useState(fakeUser.email);
  const [phone, setPhone] = useState(fakeUser.phone);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const user = { ...fakeUser, email, phone };

  if (!signedIn) {
    return (
      <div className="min-h-screen bg-surface dark:bg-surface-dark p-4 flex flex-col items-center justify-center">
        <div className="w-24 h-24 bg-accent dark:bg-accent-dark rounded-full flex items-center justify-center mb-4">
          <User size={48} className="text-white" />
        </div>
        <h1 className="text-xl font-bold text-text-high dark:text-text-high-dark mb-2">
          Welcome to Bite Bolt
        </h1>
        <p className="text-text-body dark:text-text-body-dark text-center mb-8">
          Sign in to view your orders, save your favorite restaurants, and more.
        </p>
        <div className="w-full max-w-xs bg-white dark:bg-surface-dark rounded-lg border border-stroke dark:border-stroke-dark shadow p-6 mb-4">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={loginEmail}
              onChange={e => setLoginEmail(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-2"
              placeholder="Email address"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={loginPassword}
              onChange={e => setLoginPassword(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-2"
              placeholder="Password"
            />
          </div>
          <button
            className="w-full bg-accent dark:bg-accent-dark text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 mb-3"
            onClick={() => setSignedIn(true)}
          >
            <LogIn size={18} />
            Sign In
          </button>
          <div className="flex justify-between text-xs mb-3">
            <button className="text-accent dark:text-accent-dark font-medium">Sign Up</button>
            <button className="text-accent dark:text-accent-dark font-medium">Forgot my password?</button>
          </div>
          <button
            className="w-full flex items-center justify-center gap-2 bg-white border border-stroke dark:border-stroke-dark rounded-lg py-3 mb-3 shadow hover:shadow-lg transition"
            onClick={() => setSignedIn(true)}
          >
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" className="w-6 h-6" />
            <span className="font-medium text-text-high dark:text-text-high-dark">Sign in with Google</span>
          </button>
          <button
            className="w-full flex items-center justify-center gap-2 bg-black rounded-lg py-3 mb-3 shadow hover:shadow-lg transition"
            onClick={() => setSignedIn(true)}
          >
            <Apple size={22} className="text-white" />
            <span className="font-medium text-white">Sign in with Apple</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface dark:bg-surface-dark p-4">
      <div className="flex flex-col items-center justify-center pt-8 pb-6">
        <img src={user.photo} alt={user.name} className="w-24 h-24 rounded-full object-cover mb-3 border-4 border-accent" />
        <h2 className="text-2xl font-bold text-text-high dark:text-text-high-dark mb-1">{user.name}</h2>
        <button
          className="mt-2 text-accent dark:text-accent-dark text-sm font-medium underline"
          onClick={() => setSignedIn(false)}
        >
          Log Out
        </button>
      </div>
      {/* Tabs */}
      <div className="flex justify-center gap-2 mb-6">
        {TABS.map(t => (
          <button
            key={t}
            className={`px-4 py-2 rounded-full font-medium transition-colors ${tab === t ? 'bg-accent text-white' : 'bg-gray-100 text-gray-800'}`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>
      {/* Tab Content */}
      {tab === 'Personal Info' && (
        <div className="max-w-md mx-auto bg-white dark:bg-surface-dark rounded-lg shadow p-6 flex flex-col gap-4">
          {editInfo ? (
            <>
              <div className="flex items-center gap-3">
                <Mail size={20} className="text-accent" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="flex-1 border rounded px-3 py-2"
                />
              </div>
              <div className="flex items-center gap-3">
                <Phone size={20} className="text-accent" />
                <input
                  type="text"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="flex-1 border rounded px-3 py-2"
                />
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  className="flex-1 bg-accent text-white py-2 rounded-lg flex items-center justify-center gap-2"
                  onClick={() => setEditInfo(false)}
                >
                  <Save size={16} /> Save
                </button>
                <button
                  className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg flex items-center justify-center gap-2"
                  onClick={() => { setEditInfo(false); setEmail(fakeUser.email); setPhone(fakeUser.phone); }}
                >
                  <CloseIcon size={16} /> Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <Mail size={20} className="text-accent" />
                <span className="font-medium">{user.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={20} className="text-accent" />
                <span className="font-medium">{user.phone}</span>
              </div>
              <button
                className="mt-2 text-accent dark:text-accent-dark text-sm font-medium flex items-center gap-1"
                onClick={() => setEditInfo(true)}
              >
                <Edit2 size={16} /> Edit
              </button>
            </>
          )}
        </div>
      )}
      {tab === 'Addresses' && (
        <div className="max-w-md mx-auto bg-white dark:bg-surface-dark rounded-lg shadow p-6 flex flex-col gap-4">
          {user.addresses.map(addr => (
            <div key={addr.id} className={`flex items-center gap-3 p-3 rounded-lg ${addr.isDefault ? 'bg-accent/10 border border-accent' : 'bg-gray-100'}`}>
              <Home size={20} className="text-accent" />
              <div className="flex-1">
                <div className="font-semibold">{addr.label}</div>
                <div className="text-sm text-gray-600">{addr.address}</div>
              </div>
              {addr.isDefault && <CheckCircle size={20} className="text-accent" />}
            </div>
          ))}
        </div>
      )}
      {tab === 'Orders' && (
        <div className="max-w-md mx-auto bg-white dark:bg-surface-dark rounded-lg shadow p-6 flex flex-col gap-4">
          {user.orders.map(order => (
            <div key={order.id} className="flex items-center gap-3 p-3 rounded-lg bg-gray-100">
              <Package size={20} className="text-accent" />
              <div className="flex-1">
                <div className="font-semibold">Order #{order.id}</div>
                <div className="text-sm text-gray-600">{order.date} • {order.items} items</div>
              </div>
              <div className="font-bold text-accent">£{order.total.toFixed(2)}</div>
              <span className={`ml-2 text-xs font-semibold ${order.status === 'Delivered' ? 'text-green-600' : 'text-red-500'}`}>{order.status}</span>
              <ArrowRight size={18} className="text-gray-400" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};