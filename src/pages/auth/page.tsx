
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/base/Button';
import Input from '../../components/base/Input';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (!phone || phone.length !== 10) return;
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setShowOtp(true);
      setLoading(false);
      setOtpTimer(30);
      
      // Start countdown
      const timer = setInterval(() => {
        setOtpTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, 1500);
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) return;
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate('/home');
    }, 1500);
  };

  const resendOtp = () => {
    if (otpTimer === 0) {
      handleSendOtp();
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="px-6 pt-16 pb-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
            <i className="ri-scales-3-line text-2xl text-blue-600"></i>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-gray-600">
            {isLogin ? 'Sign in to continue' : 'Join AdvocateConnect today'}
          </p>
        </div>

        <div className="space-y-6">
          {!showOtp ? (
            <>
              <Input
                label="Mobile Number"
                type="tel"
                placeholder="Enter 10-digit mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                icon="ri-phone-line"
              />
              
              <Button
                onClick={handleSendOtp}
                loading={loading}
                disabled={phone.length !== 10}
                className="w-full"
                size="lg"
              >
                Send OTP
              </Button>
            </>
          ) : (
            <>
              <div className="text-center mb-4">
                <p className="text-gray-600">
                  OTP sent to +91 {phone}
                </p>
              </div>
              
              <Input
                label="Enter OTP"
                type="text"
                placeholder="6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                icon="ri-lock-line"
              />
              
              <div className="text-center">
                <button
                  onClick={resendOtp}
                  disabled={otpTimer > 0}
                  className={`text-sm ${
                    otpTimer > 0 ? 'text-gray-400' : 'text-blue-600 hover:text-blue-700'
                  }`}
                >
                  {otpTimer > 0 ? `Resend OTP in ${otpTimer}s` : 'Resend OTP'}
                </button>
              </div>
              
              <Button
                onClick={handleVerifyOtp}
                loading={loading}
                disabled={otp.length !== 6}
                className="w-full"
                size="lg"
              >
                Verify & Continue
              </Button>
            </>
          )}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 text-sm font-medium"
          >
            {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
