import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNav from '../../components/feature/TopNav';
import BottomNav from '../../components/feature/BottomNav';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [showKYCModal, setShowKYCModal] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  const [profile, setProfile] = useState({
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91 98765 43210',
    kycStatus: 'verified',
    walletBalance: 2500,
    language: 'English'
  });

  const menuItems = [
    {
      icon: 'ri-user-line',
      title: 'Personal Information',
      subtitle: 'Update your profile details',
      action: () => {}
    },
    {
      icon: 'ri-shield-check-line',
      title: 'KYC Verification',
      subtitle: profile.kycStatus === 'verified' ? 'Verified' : 'Complete your verification',
      action: () => setShowKYCModal(true),
      status: profile.kycStatus
    },
    {
      icon: 'ri-bank-line',
      title: 'Bank Details',
      subtitle: 'Manage payment methods',
      action: () => setShowBankModal(true)
    },
    {
      icon: 'ri-lock-line',
      title: 'Change Password',
      subtitle: 'Update your account password',
      action: () => setShowPasswordModal(true)
    },
    {
      icon: 'ri-global-line',
      title: 'Language',
      subtitle: `Current: ${profile.language}`,
      action: () => setShowLanguageModal(true)
    },
    {
      icon: 'ri-wallet-line',
      title: 'Wallet',
      subtitle: `Balance: ₹${profile.walletBalance}`,
      action: () => navigate('/wallet')
    },
    {
      icon: 'ri-notification-line',
      title: 'Notifications',
      subtitle: 'Manage notification preferences',
      action: () => {}
    },
    {
      icon: 'ri-question-line',
      title: 'Help & Support',
      subtitle: 'Get help and contact support',
      action: () => {}
    },
    {
      icon: 'ri-file-text-line',
      title: 'Terms & Privacy',
      subtitle: 'Legal information',
      action: () => {}
    },
    {
      icon: 'ri-logout-box-line',
      title: 'Logout',
      subtitle: 'Sign out of your account',
      action: () => navigate('/auth'),
      danger: true
    }
  ];

  const KYCModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
      <div className="bg-white rounded-t-3xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">KYC Verification</h3>
            <button
              onClick={() => setShowKYCModal(false)}
              className="w-8 h-8 flex items-center justify-center text-gray-500"
            >
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {profile.kycStatus === 'verified' ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-check-line text-3xl text-green-600"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">KYC Verified</h3>
              <p className="text-gray-600">Your identity has been successfully verified.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <i className="ri-upload-cloud-line text-3xl text-gray-400 mb-2"></i>
                <p className="text-sm text-gray-500 mb-2">Upload Aadhaar Card</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
                  Choose File
                </button>
              </div>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <i className="ri-upload-cloud-line text-3xl text-gray-400 mb-2"></i>
                <p className="text-sm text-gray-500 mb-2">Upload PAN Card</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
                  Choose File
                </button>
              </div>

              <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium">
                Submit for Verification
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const BankModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
      <div className="bg-white rounded-t-3xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Bank Details</h3>
            <button
              onClick={() => setShowBankModal(false)}
              className="w-8 h-8 flex items-center justify-center text-gray-500"
            >
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Account Holder Name</label>
            <input
              type="text"
              defaultValue="Priya Sharma"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
            <input
              type="text"
              placeholder="Enter account number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">IFSC Code</label>
            <input
              type="text"
              placeholder="Enter IFSC code"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
            <input
              type="text"
              placeholder="Enter bank name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium">
            Save Bank Details
          </button>
        </div>
      </div>
    </div>
  );

  const PasswordModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
      <div className="bg-white rounded-t-3xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Change Password</h3>
            <button
              onClick={() => setShowPasswordModal(false)}
              className="w-8 h-8 flex items-center justify-center text-gray-500"
            >
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
            <input
              type="password"
              placeholder="Enter current password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium">
            Update Password
          </button>
        </div>
      </div>
    </div>
  );

  const LanguageModal = () => {
    const languages = ['English', 'Hindi', 'Marathi', 'Gujarati', 'Telugu', 'Tamil', 'Bengali'];
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
        <div className="bg-white rounded-t-3xl w-full max-h-[80vh] overflow-y-auto">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Select Language</h3>
              <button
                onClick={() => setShowLanguageModal(false)}
                className="w-8 h-8 flex items-center justify-center text-gray-500"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-2">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setProfile({...profile, language: lang});
                    setShowLanguageModal(false);
                  }}
                  className={`w-full text-left p-4 rounded-lg ${
                    profile.language === lang 
                      ? 'bg-blue-50 text-blue-600 border border-blue-200' 
                      : 'bg-white text-gray-900 border border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{lang}</span>
                    {profile.language === lang && (
                      <i className="ri-check-line text-blue-600"></i>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav title="Profile" showNotifications={true} />

      <div className="pt-14 pb-20">
        {/* Profile Header */}
        <div className="bg-white p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-blue-600">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900">{profile.name}</h2>
              <p className="text-gray-600">{profile.email}</p>
              <p className="text-gray-600">{profile.phone}</p>
              <div className="flex items-center space-x-2 mt-2">
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                  profile.kycStatus === 'verified' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {profile.kycStatus === 'verified' ? 'KYC Verified' : 'KYC Pending'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Wallet Balance */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 mx-4 mt-4 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Wallet Balance</p>
              <p className="text-2xl font-bold">₹{profile.walletBalance}</p>
            </div>
            <button className="bg-white bg-opacity-20 px-4 py-2 rounded-lg text-sm font-medium">
              Add Money
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <div className="px-4 py-6">
          <div className="bg-white rounded-xl overflow-hidden">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={item.action}
                className={`w-full text-left p-4 flex items-center space-x-3 ${
                  index < menuItems.length - 1 ? 'border-b border-gray-100' : ''
                } hover:bg-gray-50 transition-colors ${
                  item.danger ? 'text-red-600' : 'text-gray-900'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  item.danger 
                    ? 'bg-red-50 text-red-600' 
                    : item.status === 'verified'
                    ? 'bg-green-50 text-green-600'
                    : 'bg-gray-50 text-gray-600'
                }`}>
                  <i className={`${item.icon} text-lg`}></i>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{item.title}</h3>
                  <p className={`text-sm ${item.danger ? 'text-red-500' : 'text-gray-500'}`}>
                    {item.subtitle}
                  </p>
                </div>
                <i className={`ri-arrow-right-s-line text-gray-400 ${item.danger ? 'text-red-400' : ''}`}></i>
              </button>
            ))}
          </div>
        </div>
      </div>

      {showKYCModal && <KYCModal />}
      {showBankModal && <BankModal />}
      {showPasswordModal && <PasswordModal />}
      {showLanguageModal && <LanguageModal />}
      <BottomNav />
    </div>
  );
};

export default ProfilePage;