
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/base/Button';

const onboardingSlides = [
  {
    title: 'Verified Legal Experts',
    description: 'Connect with verified advocates across India. All lawyers are thoroughly vetted and certified.',
    image: 'https://readdy.ai/api/search-image?query=Professional%20Indian%20lawyers%20in%20courtroom%2C%20verified%20badge%20overlay%2C%20legal%20consultation%20illustration%2C%20modern%20flat%20design%20style%2C%20blue%20and%20white%20color%20scheme&width=300&height=200&seq=onboard1&orientation=landscape'
  },
  {
    title: 'Track Your Cases',
    description: 'Stay updated with real-time case status, hearing dates, and important legal documents.',
    image: 'https://readdy.ai/api/search-image?query=Digital%20case%20tracking%20interface%2C%20legal%20documents%20on%20tablet%20screen%2C%20progress%20timeline%20illustration%2C%20modern%20app%20design%2C%20professional%20legal%20technology&width=300&height=200&seq=onboard2&orientation=landscape'
  },
  {
    title: 'Secure Payments',
    description: 'Safe and transparent payment system with wallet integration and instant refunds.',
    image: 'https://readdy.ai/api/search-image?query=Secure%20payment%20interface%2C%20digital%20wallet%20illustration%2C%20shield%20with%20rupee%20symbol%2C%20safe%20transaction%20concept%2C%20modern%20fintech%20design&width=300&height=200&seq=onboard3&orientation=landscape'
  }
];

export default function Onboarding() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const nextSlide = () => {
    if (currentSlide < onboardingSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate('/auth');
    }
  };

  const skipOnboarding = () => {
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 px-6 pt-12 pb-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex space-x-2">
            {onboardingSlides.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'w-8 bg-blue-600' : 'w-2 bg-gray-300'
                }`}
              />
            ))}
          </div>
          <button
            onClick={skipOnboarding}
            className="text-gray-500 text-sm font-medium"
          >
            Skip
          </button>
        </div>

        <div className="text-center">
          <div className="mb-8">
            <img
              src={onboardingSlides[currentSlide].image}
              alt={onboardingSlides[currentSlide].title}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {onboardingSlides[currentSlide].title}
          </h2>
          
          <p className="text-gray-600 text-lg leading-relaxed mb-12">
            {onboardingSlides[currentSlide].description}
          </p>
        </div>
      </div>

      <div className="px-6 pb-8">
        <Button
          onClick={nextSlide}
          className="w-full"
          size="lg"
        >
          {currentSlide === onboardingSlides.length - 1 ? 'Get Started' : 'Next'}
        </Button>
      </div>
    </div>
  );
}
