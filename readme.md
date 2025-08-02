# **AqueousNite \- Underwater Digital Experience Studio**

Welcome to the AqueousNite website repository. This is an immersive and interactive portfolio website for a fictional underwater-themed digital experience studio. This project showcases a modern, single-page application built with vanilla HTML, CSS, and JavaScript. It heavily features animations from the **GSAP (GreenSock Animation Platform)** library and a dynamic video background to create an engaging and deep-sea user experience.

## **🚀 Live Demo**

A live version of the project is deployed on Netlify.  
[**View Live Demo**](http://aqueousnite.netlify.app/)

## **✨ Features**

This project is packed with modern features to create a rich, immersive experience:

* **Dynamic Video Background:** A full-screen video background of ocean currents creates an immediate sense of immersion.  
* **Elegant Pre-loader:** A custom loader with a progress counter ensures all assets are ready before the user dives in.  
* **Interactive Cursor:** A custom cursor that creates a ripple effect, mimicking disturbances in water.  
* **Seamless Page Transitions:** Smooth, full-screen transitions that feel like descending into different depths of the ocean.  
* **Advanced GSAP Animations:**  
  * **Text Animation:** Character-level reveal animations for titles that make text flow like water.  
  * **Scroll-Triggered Animations:** Elements gracefully float into view as the user scrolls, powered by ScrollTrigger.  
  * **Parallax Effects:** Subtle parallax scrolling on background elements and the main video to add depth and a sense of being underwater.  
* **Interactive UI Components:**  
  * **Work Grid ("Coral Collection"):** A portfolio grid with a sleek hover effect that reveals project details and zooms into the image.  
  * **Team Section ("The Pod"):** An interactive list of team members that updates a central image on hover.  
* **Infinite Marquees:** Two separate infinite scrolling marquees (one for services, one for images) that pause on hover.  
* **Responsive Design:** A fully responsive layout that adapts to all screen sizes, from mobile to desktop.  
* **Sticky Header:** A navigation bar that sticks to the top and changes appearance on scroll.

## **🛠️ Tech Stack**

* **Frontend:** HTML5, CSS3, JavaScript (ES6+ Classes)  
* **Animations:** [GSAP (GreenSock Animation Platform)](https://www.google.com/search?q=https://greensock.com/gsap/)  
  * ScrollTrigger for scroll-based animations.  
  * SplitText for advanced text animations.  
* **Build Tool:** [Vite](https://vitejs.dev/)  
* **Deployment:** [Netlify](https://www.netlify.com/)

## **📦 Installation & Setup**

To run this project locally, follow these steps:

1. **Clone the repository:**  
   git clone https://github.com/your-username/aqueous-nite.git

2. **Navigate to the project directory:**  
   cd aqueous-nite

3. **Install the dependencies:**  
   npm install

4. **Start the development server:**  
   npm run dev

   This will start a local development server. You can now open your browser and navigate to http://localhost:5173 (the port may vary) to see the website.

## **📁 Project Structure**

The project is organized into the following main files:  
/  
├── index.html            \# The main HTML entry point  
├── src/  
│   ├── main.js           \# Main JavaScript file with all the logic  
│   └── style.css         \# All CSS styles for the application  
├── package.json          \# Project metadata and dependencies  
└── package-lock.json     \# Exact versions of dependencies

## **💡 Code Overview**

The JavaScript in src/main.js is organized into classes, with each class managing a specific feature or section of the website.

* VideoBackground: Manages the looping ocean video background and its parallax effect.  
* PageTransition: Handles the full-screen transition animation when navigating between sections.  
* CursorRipple: Creates the custom cursor and its water-ripple effect.  
* Loader: Manages the initial loading screen animation.  
* Navigation: Controls the behavior of the responsive navigation menu.  
* HeroAnimation: Animates the hero section's text content using GSAP's SplitText.  
* ServicesAnimation: Manages the animations for the "Oceanic Craft" service cards.  
* WorkSection: Controls the hover and scroll animations for the "Coral Collection" portfolio grid.  
* ImageMarquee & Marquee: Manages the infinite scrolling marquees.  
* TeamSection: Handles the interactive hover effect in "The Pod" team section.  
* ContactForm: Adds animations and a simulated submission effect to the contact form.  
* ScrollAnimations: A general class for other scroll-triggered animations.

## **🤝 Contributing**

Contributions are welcome\! If you have any ideas, suggestions, or bug fixes, please feel free to open an issue or submit a pull request.

## **📄 License**

This project is open source and available under the [GNU License](https://github.com/stupiduck/pixxelhack/blob/main/LICENSE).
