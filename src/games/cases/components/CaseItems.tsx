// CaseItems.tsx
import React, { useState } from 'react';
import gemImage from '../assets/images/imgi_10_token-gold-3.Dei_GT_-.png'; // Update the path accordingly

interface CaseItemProps {
  baseColor: string;
  panelColor: string;
}

const CaseItems: React.FC<CaseItemProps> = ({ baseColor, panelColor }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div
      className="relative w-[124px] h-[150px] rounded-xl cursor-pointer"
      onClick={toggleOpen}
    >
      {/* Bottom part (base) */}
      <div
        className="absolute bottom-0 left-0 w-full h-[94px] rounded-b-xl"
        style={{ backgroundColor: baseColor }}
      >
        {/* Black divider */}
        <div className="absolute top-0 left-0 w-full h-[6px] bg-black" />

        {/* Connector */}
        <div
          className="absolute top-[2px] left-[42px] w-[40px] h-[14px] bg-black rounded-b-md"
        />
      </div>

      {/* Top part (lid) */}
      <div
        className={`absolute w-full h-[56px] rounded-t-xl origin-bottom transition-transform duration-500 ease-in-out`}
        style={{
          backgroundColor: baseColor,
          transform: isOpen ? 'rotateX(-120deg)' : 'rotateX(0deg)',
          transformOrigin: 'bottom center',
          zIndex: 20,
        }}
      >
        {/* Inner black side of the lid visible when opened */}
        <div
          className="absolute w-full h-full bg-black opacity-60 rounded-t-xl"
          style={{
            display: isOpen ? 'block' : 'none',
            transform: 'rotateX(180deg)',
          }}
        />

        {/* Lid panel */}
        <div
          className="absolute left-[15px] top-[14px] rounded-lg"
          style={{
            backgroundColor: panelColor,
            width: '95px',
            height: '36px',
          }}
        />
      </div>

      {/* Gem appears when open */}
      {isOpen && (
        <img
          src={gemImage}
          alt="Gem"
          className="absolute z-10 transition-transform duration-500 ease-in-out"
          style={{
            width: '60px',
            height: '60px',
            top: '50px',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        />
      )}
    </div>
  );
};

export default CaseItems;