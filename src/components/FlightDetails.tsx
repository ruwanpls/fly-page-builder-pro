
import React from 'react';
import { Clock, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import FlightRoute from './FlightRoute';
import AirlineInfo from './AirlineInfo';
import FlightAmenities, { Amenity } from './FlightAmenities';

interface FlightSegment {
  departure: {
    time: string;
    airport: string;
    code: string;
  };
  arrival: {
    time: string;
    airport: string;
    code: string;
  };
  duration: string;
  airline: string;
  flightNumber: string;
  aircraft?: string;
  amenities: Amenity[];
}

interface FlightDetailsProps {
  segments: FlightSegment[];
  className?: string;
}

export function FlightDetails({ segments, className }: FlightDetailsProps) {
  return (
    <div className={cn("bg-gray-50 p-4 rounded-md", className)}>
      {segments.map((segment, index) => (
        <div 
          key={index} 
          className={cn(
            "pb-6", 
            index < segments.length - 1 && "border-b border-gray-200 mb-6"
          )}
        >
          <FlightRoute 
            departure={segment.departure}
            arrival={segment.arrival}
            duration={segment.duration}
          />
          
          <div className="mt-4 flex justify-between">
            <div className="flex-1">
              <AirlineInfo 
                airline={segment.airline}
                flightNumber={segment.flightNumber}
              />
              {segment.aircraft && (
                <div className="text-xs text-gray-500 mt-1">
                  {segment.aircraft}
                </div>
              )}
            </div>
            
            <FlightAmenities amenities={segment.amenities} />
          </div>
          
          {index < segments.length - 1 && (
            <div className="mt-6 flex items-center">
              <Clock className="w-4 h-4 text-amber-600 mr-2" />
              <div className="flex items-baseline">
                <span className="font-medium text-amber-600">
                  {segments[index + 1].departure.time > segment.arrival.time 
                    ? `${index + 1} hr ${Math.floor(Math.random() * 40)} min layover`
                    : "Direct connection"}
                </span>
                <span className="ml-2 text-sm text-gray-600">
                  <MapPin className="w-3 h-3 inline mr-1" />
                  {segment.arrival.airport}
                </span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default FlightDetails;
