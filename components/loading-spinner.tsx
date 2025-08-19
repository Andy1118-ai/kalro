import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const SpinnerRing = ({
  size,
  border,
  color,
  reverse,
  duration,
}: {
  size: number;
  border: string;
  color: string;
  reverse?: boolean;
  duration?: number;
}) => (
  <motion.div
    className={`rounded-full border-4 ${border} ${color}`}
    style={{
      width: size,
      height: size,
    }}
    animate={{ rotate: reverse ? -360 : 360 }}
    transition={{ repeat: Infinity, duration: duration || 1, ease: "linear" }}
  />
);

const KALROLogo = () => (
  <div className="bg-white rounded-full p-2 shadow-lg relative w-16 h-16 flex items-center justify-center">
    <img
      src="/kalro.jpeg"
      alt="KALRO Logo"
      className="w-full h-full object-contain"
    />
  </div>
);

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 30); // speed of progress

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-64 bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
      <motion.div
        className="h-full bg-green-600"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ ease: "linear", duration: 0.03 }}
      />
    </div>
  );
};

interface KALROLoadingSpinnerProps {
  onLoadingComplete?: () => void;
}

const KALROLoadingSpinner: React.FC<KALROLoadingSpinnerProps> = ({ onLoadingComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onLoadingComplete?.();
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-50"
      role="status"
      aria-label="Loading KALRO content"
    >
      <div className="relative">
        {/* Outer ring */}
        <div className="relative">
          <SpinnerRing
            size={128}
            border="border-gray-200"
            color="border-t-green-600"
          />
          {/* Inner ring */}
          <div className="absolute top-2 left-2">
            <SpinnerRing
              size={112}
              border="border-gray-100"
              color="border-b-green-500"
              reverse
              duration={1.5}
            />
          </div>
          {/* Logo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <KALROLogo />
          </div>
        </div>
      </div>

      {/* Progress bar instead of loading text */}
      <div className="mt-12 text-center w-full flex justify-center">
        <ProgressBar />
      </div>
    </div>
  );
};

export default KALROLoadingSpinner;
