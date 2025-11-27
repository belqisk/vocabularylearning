import React from 'react';

/**
 * 组件用途 (Component Purpose):
 * 页面底部版权信息。
 * Page footer copyright information.
 * 
 * 样式修改点 (Style Mod Points):
 * - 简洁的灰色文本，带有上边框。
 * - Minimalist gray text with top border.
 */

const Footer: React.FC = () => {
  return (
    <footer className="py-8 text-center text-gray-400 text-sm border-t border-gray-100 dark:border-gray-800 mt-auto">
      <p>© 2024 VocabFlow. Keep learning.</p>
    </footer>
  );
};

export default Footer;
