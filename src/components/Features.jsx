import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";
import MagicButton from "./MagicButton";
import { IoCopyOutline } from "react-icons/io5";

export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");

  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({ src, title, description, isComingSoon, link }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  return (
    <div className="relative size-full">
      <video
        src={src}
        loop
        muted
        autoPlay
        className="absolute left-0 top-0 size-full object-cover object-center"
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
        </div>

        {isComingSoon ? (
          <div
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/20"
          >
            {/* Radial gradient hover effect */}
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
              }}
            />
            <TiLocationArrow className="relative z-20" />
            <p className="relative z-20">coming soon</p>
          </div>
        ) :
          <a href={link}>
            <div
              ref={hoverButtonRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white"
            >
              {/* Radial gradient hover effect */}
              <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                style={{
                  opacity: hoverOpacity,
                  background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
                }}
              />
              <TiLocationArrow className="relative z-20" />
              <p className="relative z-20">Check Live Site</p>
            </div>
          </a>
        }
      </div>
    </div>
  );
};

const Features = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const email = "prathammandavkar932@gmail.com";
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section className="bg-black pb-52">
      <div className="container mx-auto px-3 md:px-10">
        <div className="px-5 py-32">
          <p className="font-circular-web text-lg text-blue-50">
            Into the Metagame Layer for Frontend Developers
          </p>
          <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
            Step into a dynamic and evolving universe, where an ecosystem of products seamlessly integrates into an interactive overlay. As a frontend developer, you'll craft immersive experiences, building interfaces that bring this interconnected world to life and overlay it onto the user's environment.
          </p>
        </div>

        <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
          <BentoCard
            src="videos/trans.mp4"
            title={<span>The Inside Scoop</span>}
            description="Currently building a cloud-based transportation management system (TMS) that helps businesses solve logistics challenges"
            isComingSoon
          />
        </BentoTilt>

        <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
          <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
            <BentoCard
              src="videos/swift.mp4"
              title={<span>S<b>ai</b>Service</span>}
              description="The Maruti Suzuki dealership in India and has a presence in Pune, Kolhapur, Mumbai, Goa, Telangana and Kerala."
              link="https://wordpress.betadelivery.com/sai-service/pages/index.php"
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
            <BentoCard
              src="videos/pinance.mp4"
              title={<span>Pi-Finance</span>}
              description="The Financial Dashboard is a full-stack web application that provides an interface for managing employee financial data"
              // isComingSoon
              link="https://pifinance.vercel.app/"
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
            <BentoCard
              src="videos/optifii.mp4"
              title={<span>OP<b>TI</b>FII</span>}
              description="The OptiFii Dashboard is a comprehensive employee expense and benefit management platform."
              // isComingSoon
              link="https://corporatestatic.optifii.betadelivery.com/"
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_2">


            <div className="relative flex align-middle items-center justify-center size-full flex-col bg-black">
              <video
                src="videos/globe.mp4"
                loop
                muted
                autoPlay
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
              />

              <div className="relative z-10 flex flex-col items-center">
                <div
                  className={`absolute -bottom-5 right-0 ${copied ? "block" : "hidden"}`}
                >
                  {/* Add content here if needed */}
                </div>
                <MagicButton
                  title={copied ? "Email is Copied!" : "Copy my email address"}
                  icon={<IoCopyOutline />}
                  position="left"
                  handleClick={handleCopy}
                  otherClasses="!bg-[#161A31] z-10"
                />
              </div>
            </div>



          </BentoTilt>

          <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
            <BentoCard
              src="videos/ngo.mp4"
              title={<span>N<b>G</b>O</span>}
              description="The ShivShakti Kalka Sanatan Seva project is a MERN Stack-based website"
              // isComingSoon
              link="https://shivshakti-eta.vercel.app/"
            />
          </BentoTilt>
        </div>
      </div>
    </section>
  );
};

export default Features;

