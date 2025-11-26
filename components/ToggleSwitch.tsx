import React from 'react';
import { motion } from 'framer-motion';

interface ToggleSwitchProps {
  isOn: boolean;
  onToggle: () => void;
  label?: string;
}

/**
 * ToggleSwitch
 * Simple true/false switch with animation.
 */
const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isOn, onToggle, label }) => {
  return (
    <div className="flex items-center justify-between py-3 cursor-pointer" onClick={onToggle}>
      {label && <span className="text-gray-700 dark:text-gray-300 font-medium">{label}</span>}
      <div className={`w-12 h-7 flex items-center rounded-full p-1 transition-colors duration-300 ${isOn ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}`}>
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 700, damping: 30 }}
          className={`bg-white w-5 h-5 rounded-full shadow-md`}
          style={{
            marginLeft: isOn ? 'auto' : '0',
            marginRight: isOn ? '0' : 'auto',
          }}
        />
      </div>
    </div>
  );
};

export default ToggleSwitch;