
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/onboarding');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex flex-col items-center justify-center px-6">
      <div className="text-center">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg">
          <i className="ri-scales-3-line text-4xl text-blue-600"></i>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: '"Pacifico", serif' }}>
          AdvocateConnect
        </h1>
        <p className="text-blue-100 text-lg">
          Your Legal Consultation Partner
        </p>
      </div>
      
      <div className="mt-12">
        <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
}
