import React, { useEffect, useRef, useState } from 'react';
import CaseItems from './CaseItems';
import { Case } from '../data/casesData';
import expertPointer from '../assets/images/expert_pointer.png';  
import mediumPointer from '../assets/images/medium_pointer.png';
import hardPointer from '../assets/images/hard_pointer.png';
import easyPointer from '../assets/images/easy_pointer.png';

const CASE_WIDTH = 136; 
const SPIN_DURATION = 5000;
const SPEED = 10;

const pointerMap: Record<'expert' | 'medium' | 'hard' | 'easy', string> = {
  expert: expertPointer,
  medium: mediumPointer,
  hard: hardPointer,
  easy: easyPointer,
};

const GameBoard: React.FC<{
  cases: Case[];
  openedCaseIndex: number | null;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
}> = ({ cases, openedCaseIndex, difficulty }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const positionRef = useRef(0);
  const startTimeRef = useRef(0);
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    if (openedCaseIndex !== null) {
      startSpin();
    }
    return () => cancelAnimationFrame(animationRef.current!);
  }, [openedCaseIndex]);

  const startSpin = () => {
    if (cases.length === 0) return;
    setIsSpinning(true);
    startTimeRef.current = performance.now();
    positionRef.current = 0;
    spinLoop();
  };

  const spinLoop = (time?: number) => {
    const elapsed = time ? time - startTimeRef.current : 0;
    if (elapsed < SPIN_DURATION) {
      positionRef.current += SPEED;
      const totalWidth = cases.length * CASE_WIDTH;
      if (positionRef.current >= totalWidth) {
        positionRef.current = 0;
      }

      if (containerRef.current) {
        containerRef.current.style.transform = `translateX(${positionRef.current}px)`;
      }
      animationRef.current = requestAnimationFrame(spinLoop);
    } else {
      stopAtWinner();
    }
  };

  const stopAtWinner = () => {
    if (openedCaseIndex === null || !containerRef.current) {
      setIsSpinning(false);
      return;
    }
    const centerScreen = window.innerWidth / 2;
    const targetOffset = -(openedCaseIndex * CASE_WIDTH - (centerScreen - CASE_WIDTH / 2));

    containerRef.current.style.transition = 'transform 1s ease-out';
    containerRef.current.style.transform = `translateX(${targetOffset}px)`;

    setTimeout(() => {
      if (containerRef.current) containerRef.current.style.transition = '';
      setIsSpinning(false);
    }, 1000);
  };

  return (
    <div className="relative w-full h-[700px] bg-[#0f212e] flex items-center justify-center overflow-hidden">
      <div
        ref={containerRef}
        className="flex gap-3 will-change-transform"
        style={{ width: 'max-content' }}
      >
        {[...cases, ...cases].map((c, idx) => (
          <CaseItems
            key={idx}
            baseColor={c.baseColor}
            panelColor={c.panelColor}
            isOpen={idx % cases.length === openedCaseIndex}
            gem={c.gem}
          />
        ))}
      </div>

      <img
        src={pointerMap[difficulty]}
        alt="Pointer"
        className="absolute left-1/2 z-10 pointer-events-none"
        style={{
          bottom: '220px',
          transform: 'translateX(-50%)',
          width: '60px',
        }}
      />
    </div>
  );
};

export default GameBoard;
