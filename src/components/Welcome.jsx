//step4 create welcome page and install gsap and gsap/react and run npm add lucide-react to add animations to the welcome page. This will enhance the user experience by providing smooth transitions and engaging visual effects when users visit the welcome page of the portfolio.

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef } from "react"

//step6 create a helper function called renderText that takes in text, a className, and a baseWeight. This function will split the text into individual characters and wrap each character in a span element with the specified className and font weight. This allows for more granular control over the styling and animation of each character in the welcome page, enabling us to create dynamic and visually appealing text effects.
const renderText = (text, className, baseWeight = 400) => {
  return [...text].map((char, i) => (
    <span key={i} className={className} style={{ fontVariationSettings: `"wght" ${baseWeight}`}}>{char === " " ? "\u00A0" : char}</span>
  ))
}

//step7 define font weight ranges for the title and subtitle text in the welcome page. The FONT_WEIGHTS object contains the minimum, maximum, and default font weights for both the subtitle and title. This allows us to create dynamic font weight animations based on user interactions, such as mouse movements, providing a more engaging and interactive experience for visitors to the portfolio.
const FONT_WEIGHTS = {
  subtitle: { min: 100, max: 400, default: 100},
  title: { min: 400, max: 900, default: 400},
}

//step8 create a setupTextHover function that takes in a container element and a type (either "subtitle" or "title"). This function sets up an event listener for mouse movements within the container, calculating the distance of the mouse from each character and adjusting the font weight of each character accordingly. The animateLetter function uses gsap to smoothly transition the font weight of each character based on the calculated intensity, creating an interactive and visually appealing hover effect on the welcome page text.
const setupTextHover = (container, type) => {
  if(!container) return () => {};

  const letters = container.querySelectorAll("span");
  const { min, max, default: base } = FONT_WEIGHTS[type];

  const animateLetter = (letter, weight, duration = 0.25) => {
    return gsap.to(letter, { duration, ease: "power2.out", fontVariationSettings: `'wght' ${weight}`,
    });
  } 

  const handleMouseMove = (e) => {
    const { left } = container.getBoundingClientRect();
    const mouseX = e.clientX - left;

    letters.forEach((letter) => {
      const { left: l, width: w } = letter.getBoundingClientRect();
      const distance = Math.abs(mouseX - (l - left + w / 2));
      const intensity = Math.exp(-(distance ** 2) / 20000)

      animateLetter(letter, min + (max - min) * intensity);
    })
  }

  const handleMouseLeave = () => letters.forEach((letter) => animateLetter(letter, base, 0.3));

  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    container.removeEventListener("mousemove", handleMouseMove);
    container.removeEventListener("mouseleave", handleMouseLeave);
  }
}



const Welcome = () => {
  //step5 create refs for the welcome page and use gsap to create animations that trigger when the welcome page is rendered. This will make the welcome page more dynamic and visually appealing, capturing the attention of visitors as they explore the portfolio.
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  //step9 use the useGSAP hook to set up the text hover effects for both the title and subtitle in the welcome page. This will allow us to create interactive animations that respond to user interactions, enhancing the overall user experience and making the welcome page more engaging for visitors.
  useGSAP(() => {
    const titleCleanup = setupTextHover(titleRef.current, "title");
    const subtitleCleanup = setupTextHover(subtitleRef.current, "subtitle");

    return () => {
      titleCleanup();
      subtitleCleanup();
    }
  }, [])

  return (
    <section id="welcome">
      <p ref={subtitleRef}>{renderText("Hey, I'm Victor! Welcome to my", "text-3xl font-georama", 100,)}</p>
      <h1 ref={titleRef} className="mt-7">{renderText("portfolio", "text-9xl italic font-georama", 400,)}</h1>

      <div className="small-screen">
        <p>This Portfolio is designed for desktop/tablet screens only.</p>
      </div>
    </section>
  )
}

export default Welcome