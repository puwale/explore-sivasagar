import React from 'react';
import { CinematicFooter } from './ui/motion-footer';
import type { Destination } from '../data/sivasagarData';

export interface FooterProps {
  onNavigate?: (sectionId: string) => void;
  onSelectDestination?: (dest: Destination) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return <CinematicFooter onNavigate={onNavigate} />;
};

export { CinematicFooter };
