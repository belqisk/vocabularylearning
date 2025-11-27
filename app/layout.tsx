import React from 'react';
import './globals.css';
import { Providers } from '../components/Providers';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'VocabFlow - Learn Words',
  description: 'A minimalist, gesture-based vocabulary learning application.',
};

/**
 * 组件用途 (Component Purpose):
 * 根布局组件，包含HTML结构和全局Providers。
 * Root layout component, containing HTML structure and global Providers.
 * 
 * 关键点 (Key Points):
 * - 必须包含 <html> 和 <body> 标签。
 * - Must include <html> and <body> tags.
 * - 引入 globals.css 确保样式加载。
 * - Import globals.css to ensure styles load.
 */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}