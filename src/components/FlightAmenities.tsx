
import React from 'react';
import { Wifi, Usb, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export interface Amenity {
  type: 'legroom' | 'usb' | 'wifi' | 'power' | 'video' | 'emissions';
  value: string;
  details?: string;
}

interface FlightAmenitiesProps {
  amenities: Amenity[];
  className?: string;
}

export function FlightAmenities({ amenities, className }: FlightAmenitiesProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {amenities.map((amenity, index) => (
        <TooltipProvider key={index}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center text-sm text-gray-600">
                {amenity.type === 'legroom' && (
                  <>
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 14L8 10H16L12 14Z" fill="#6B7280"/>
                    </svg>
                    {amenity.value}
                  </>
                )}
                {amenity.type === 'usb' && (
                  <>
                    <Usb className="w-4 h-4 mr-2" />
                    {amenity.value}
                  </>
                )}
                {amenity.type === 'wifi' && (
                  <>
                    <Wifi className="w-4 h-4 mr-2" />
                    {amenity.value}
                  </>
                )}
                {amenity.type === 'power' && (
                  <>
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.5 11L9.5 16L12 20L19 12L14.5 7L12 11H7L10.5 5" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {amenity.value}
                  </>
                )}
                {amenity.type === 'video' && (
                  <>
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="2" y="4" width="20" height="16" rx="2" stroke="#6B7280" strokeWidth="2"/>
                      <path d="M10 9L15 12L10 15V9Z" fill="#6B7280"/>
                    </svg>
                    {amenity.value}
                  </>
                )}
                {amenity.type === 'emissions' && (
                  <>
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 14C8 14 10.5 16 12 16C13.5 16 16 14 16 14M8 10C8 10 10.5 8 12 8C13.5 8 16 10 16 10" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"/>
                      <circle cx="12" cy="12" r="9" stroke="#6B7280" strokeWidth="2"/>
                    </svg>
                    {amenity.value}
                  </>
                )}
                {amenity.details && (
                  <Info className="w-4 h-4 ml-1 text-blue-500" />
                )}
              </div>
            </TooltipTrigger>
            {amenity.details && (
              <TooltipContent>
                <p>{amenity.details}</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
}

export default FlightAmenities;
