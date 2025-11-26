# Vocabulary Learning App

A lightweight, mobile-first vocabulary learning application designed for smooth, interactive English learning. This app focuses on a clean, minimalist UI with intuitive swipe-based interactions and browser-based speech pronunciation.

---

## 📝 Features

- **Swipeable Word Cards**: Learn words by swiping left or right, with smooth tilt and scale animations.
- **Pronunciation**: Click the pronunciation button to hear the word using the browser's built-in speech synthesis.
- **Progress Tracking**: Visual progress bar showing the current word index out of the total list.
- **Quick Actions**: Mark words as "Favorite" or "Learned" and rate difficulty using a 5-star system.
- **Settings**:
  - Study order: random or sequential
  - Toggle pronunciation on/off
  - Dark mode toggle
  - Font size adjustment
  - Upload / download word list
- **Responsive Layout**: Mobile-first design with desktop compatibility.
- **Minimalist Design**: Black and white with orange-yellow accent highlights for actions and important states.

---

## 💻 Tech Stack

- **Framework**: Next.js
- **Components**: React Functional Components
- **Styling**: Tailwind CSS
- **Animations (optional)**: Framer Motion
- **Speech Synthesis**: Browser's built-in SpeechSynthesis API

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn

### 🎨 UI / UX Notes

Minimalist black & white theme

Accent color: orange-yellow for buttons, hover effects, and active states

Slightly rounded corners (4–8px)

Smooth, modern animations

Mobile-first with responsive desktop design

### 🗂 File Structure
/app
  page.tsx
  /words
    page.tsx
  /settings
    page.tsx
/components
  Header.tsx
  Footer.tsx
  WordCard.tsx
  ToggleSwitch.tsx
  ProgressBar.tsx
/styles
  globals.css
/public
  placeholder-image.png

## ⚠️ This project is for portfolio and personal learning purposes only. Unauthorized commercial use is prohibited.
