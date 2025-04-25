
import React from 'react';
import { cn } from '@/lib/utils';

interface AirlineInfoProps {
  airline: string;
  partners?: string[];
  flightNumber?: string;
  className?: string;
  logoSize?: "sm" | "md" | "lg";
}

const airlineLogos: Record<string, string> = {
  "Lufthansa": "/lovable-uploads/lufthansa.svg",
  "United": "/lovable-uploads/united.svg",
  "Austrian": "/lovable-uploads/austrian.svg",
  "Brussels Airlines": "/lovable-uploads/brussels.svg",
  "Virgin Atlantic": "/lovable-uploads/virgin.svg",
  "Delta": "/lovable-uploads/delta.svg",
  "Air France": "/lovable-uploads/airfrance.svg",
  "KLM": "/lovable-uploads/klm.svg",
  "British Airways": "/lovable-uploads/ba.svg",
  "Iberia": "/lovable-uploads/iberia.svg",
  "American": "/lovable-uploads/american.svg",
  "Finnair": "/lovable-uploads/finnair.svg",
};

export function AirlineInfo({ 
  airline, 
  partners = [], 
  flightNumber, 
  className,
  logoSize = "sm" 
}: AirlineInfoProps) {
  const logoClasses = {
    "sm": "w-6 h-6",
    "md": "w-8 h-8",
    "lg": "w-12 h-12",
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn("flex-shrink-0", logoClasses[logoSize])}>
        {airline && airlineLogos[airline] ? (
          <img 
            src={airlineLogos[airline]} 
            alt={`${airline} logo`}
            className="w-full h-full object-contain"
          />
        ) : (
          <div className={cn("bg-gray-200 rounded-full flex items-center justify-center", logoClasses[logoSize])}>
            {airline?.charAt(0)}
          </div>
        )}
      </div>
      <div className="text-sm">
        <div className="font-medium">{airline}</div>
        {flightNumber && <div className="text-xs text-muted-foreground">{flightNumber}</div>}
        {partners && partners.length > 0 && (
          <div className="text-xs text-muted-foreground">
            {partners.join(', ')}
          </div>
        )}
      </div>
    </div>
  );
}

export default AirlineInfo;
