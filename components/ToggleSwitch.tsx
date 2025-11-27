'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * 组件用途 (Component Purpose):
 * 通用开关组件，用于设置页面。
 * Generic toggle switch component for settings page.
 * 
 * 交互说明 (Interaction Notes):
 * - 点击切换状态，带有弹簧动画效果。
 * - Click to toggle state with spring animation effect.
 */

interface ToggleSwitchProps {
  isOn: boolean;
  onToggle: () => void;
  label?: string;
}

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
