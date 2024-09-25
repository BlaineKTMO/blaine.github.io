import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import Typed from 'typed.js';
import ReactFullpage from '@fullpage/react-fullpage';

export default function Home() {
    const typedElement = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (event) => {
            const x = (event.clientX / window.innerWidth) * 100 * 0.05;
            const y = (event.clientY / window.innerHeight) * 100 * 0.05;
            setMousePosition({ x, y });

            document.documentElement.style.setProperty('--mouse-x', x);
            document.documentElement.style.setProperty('--mouse-y', y);

        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    useEffect(() => {
        const typeSpeeds = [60, 60, 50, 60, 60]; // Different type speeds for each string
        const backSpeeds = [60, 60, 60, 15, 60]; // Different type speeds for each string
        const backDelays = [800, 1500, 800, 1200, 500]; // Different back delays for each string

        const options = {
            strings: [
                "Hi, I'm <strong><em>Blaine</em></strong>",
                "I'm a software engineer...",
                "...specializing in robotics and automata."
            ],
            typeSpeed: typeSpeeds[0],
            backSpeed: backSpeeds[0],
            backDelay: backDelays[0],
            loop: false,
            showCursor: true, // Show the cursor
            cursorChar: '<', // Customize the cursor character
            autoInsertCss: true, // Automatically insert CSS for cursor
            preStringTyped: (arrayPos, self) => {
                // Update typeSpeed and backDelay for each string
                self.typeSpeed = typeSpeeds[arrayPos];
                self.backSpeed = backSpeeds[arrayPos];
                self.backDelay = backDelays[arrayPos];
            }
        };

        const typed = new Typed(typedElement.current, options);

        return () => {
            // Destroy Typed instance during cleanup to stop animation
            typed.destroy();
        };
    }, []);

    return (
        <div>
            <Head>
                <title>About Me</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <ReactFullpage
                navigation
                sectionsColor={["#FFB7B2", "#FFDAC1", "#B39EB5"]}
                render={({ state, fullpageApi }) => {
                    return (
                        <ReactFullpage.Wrapper>
                            <div className="section">
                                <section id="about">
                                    <h1 ref={typedElement} className="typed-text"></h1>
                                </section>
                            </div>
                            <div className="section">
                                <h2>Slide 2</h2>
                                <p>Content for the second slide.</p>
                            </div>
                            <div className="section">
                                <div className='overlay-l'>
                                    <div className='text-container'>
                                        <h2>Stay a while</h2>
                                        <p>Content for the third slide.</p>
                                    </div>
                                </div>
                                <div className='overlay'>
                                    <div className="mouse-position" style={{ transform: `translate(${mousePosition.x}%, ${mousePosition.y}%)` }}>
                                        Robotics embodies a fascinating convergence of art, engineering, and technology, creating a realm where imagination meets precision. The beauty of robotics lies not only in the intricate designs and sophisticated mechanics of the machines themselves but also in their capacity to enhance human life and expand our understanding of the world. Each robot, whether a delicate humanoid capable of expressing emotion or a robust industrial arm executing complex tasks, showcases the elegance of human ingenuity and creativity. The interplay of sensors, algorithms, and actuators enables robots to perform with remarkable efficiency and adaptability, often mimicking the nuanced movements of living beings. As they navigate environments, solve problems, and even engage in creative pursuits like painting or music composition, robots challenge our perceptions of intelligence and artistry. Moreover, the collaborative potential of robotics—where machines and humans work side by side—illustrates a future rich with possibilities, highlighting the harmony between technology and humanity. In this intricate dance of metal and code, we find not just tools, but companions that inspire awe and spark curiosity, inviting us to explore new horizons of innovation and discovery. Robotics embodies a fascinating convergence of art, engineering, and technology, creating a realm where imagination meets precision. The beauty of robotics lies not only in the intricate designs and sophisticated mechanics of the machines themselves but also in their capacity to enhance human life and expand our understanding of the world. Each robot, whether a delicate humanoid capable of expressing emotion or a robust industrial arm executing complex tasks, showcases the elegance of human ingenuity and creativity. The interplay of sensors, algorithms, and actuators enables robots to perform with remarkable efficiency and adaptability, often mimicking the nuanced movements of living beings. As they navigate environments, solve problems, and even engage in creative pursuits like painting or music composition, robots challenge our perceptions of intelligence and artistry. Moreover, the collaborative potential of robotics—where machines and humans work side by side—illustrates a future rich with possibilities, highlighting the harmony between technology and humanity. In this intricate dance of metal and code, we find not just tools, but companions that inspire awe and spark curiosity, inviting us to explore new horizons of innovation and discovery.
                                    </div>
                                    <div className="scrolling-text">
                                        <span>Robotics Controls Autonomous Mobility</span>
                                    </div>
                                </div>
                            </div>
                        </ReactFullpage.Wrapper>
                    );
                }}
            />
            <hr className="static-line" /> {/* Static horizontal line at the bottom */}

        </div>
    );
}