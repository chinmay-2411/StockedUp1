import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Wifi, Bell, ChefHat, ChevronRight, Package } from "lucide-react";
import { Button } from "../components/ui/button";

const slides = [
  {
    icon: Package,
    title: "Smart Weight Sensing",
    description: "Track your kitchen inventory in real-time with IoT-enabled weight sensors",
    color: "#E07A5F",
  },
  {
    icon: Bell,
    title: "Intelligent Alerts",
    description: "Get notified when ingredients are running low and need restocking",
    color: "#81B29A",
  },
  {
    icon: ChefHat,
    title: "Recipe Suggestions",
    description: "Discover recipes based on what you have in your smart pantry",
    color: "#F2CC8F",
  },
];

export function OnboardingScreen() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate("/app");
    }
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <div className="flex flex-col items-center justify-between h-screen max-w-md mx-auto px-6 py-12 bg-background">
      {/* Logo & Tagline */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="w-20 h-20 mx-auto mb-4 bg-[#E07A5F] rounded-3xl flex items-center justify-center">
          <Package className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl mb-2">StockedUp</h1>
        <p className="text-gray-600">Your Kitchen, Intelligently Stocked</p>
      </motion.div>

      {/* Slide Content */}
      <motion.div
        key={currentSlide}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="flex-1 flex flex-col items-center justify-center text-center"
      >
        <div
          className="w-32 h-32 rounded-full flex items-center justify-center mb-8"
          style={{ backgroundColor: `${slide.color}20` }}
        >
          <Icon className="w-16 h-16" style={{ color: slide.color }} />
        </div>
        <h2 className="text-3xl mb-4">{slide.title}</h2>
        <p className="text-gray-600 text-lg px-4">{slide.description}</p>
      </motion.div>

      {/* Dots & Button */}
      <div className="w-full">
        <div className="flex justify-center gap-2 mb-8">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? "w-8 bg-[#E07A5F]" : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>
        <Button
          onClick={handleNext}
          className="w-full h-14 text-lg rounded-2xl bg-[#E07A5F] hover:bg-[#d66b50]"
        >
          {currentSlide < slides.length - 1 ? (
            <>
              Next <ChevronRight className="ml-2" />
            </>
          ) : (
            "Get Started"
          )}
        </Button>
      </div>
    </div>
  );
}
