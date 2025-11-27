import React from 'react';

/**
 * 组件用途 (Component Purpose):
 * 显示学习进度的进度条。
 * Progress bar displaying learning progress.
 * 
 * 样式修改点 (Style Mod Points):
 * - 圆角设计，平滑过渡动画。
 * - Rounded design, smooth transition animation.
 */

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = Math.min(100, (current / total) * 100);

  return (
    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
      <div 
        className="h-full bg-primary transition-all duration-500 ease-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default ProgressBar;
