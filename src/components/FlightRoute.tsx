
import React from 'react';
import { Clock } from 'lucide-react';

interface FlightRouteProps {
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
}

export function FlightRoute({ departure, arrival, duration }: FlightRouteProps) {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex flex-col items-start">
        <span className="text-lg font-bold">{departure.time}</span>
        <span className="text-sm text-gray-600">
          {departure.airport} ({departure.code})
        </span>
      </div>

      <div className="flex-1 mx-4 flex flex-col items-center">
        <div className="flex items-center text-xs text-gray-500 mb-1">
          <Clock className="w-3 h-3 mr-1" />
          <span>{duration}</span>
        </div>
        <div className="w-full flex items-center">
          <div className="h-0.5 flex-1 bg-gray-300"></div>
          <div className="mx-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 16.5H8.3C7.5 16.5 7.2 15.7 7.7 15.1L14 8.5H9.3C8.9 8.5 8.5 8.3 8.3 8L6.5 5.5H2.2C1.5 5.5 1.1 6.2 1.5 6.8L3 9H5.3L1 15H3.3L9 11L11.3 15H22C22.6 15 23 15.4 23 16C23 16.3 22.6 16.5 22 16.5Z" fill="#9CA3AF"/>
            </svg>
          </div>
          <div className="h-0.5 flex-1 bg-gray-300"></div>
        </div>
      </div>

      <div className="flex flex-col items-end">
        <span className="text-lg font-bold">{arrival.time}</span>
        <span className="text-sm text-gray-600">
          {arrival.airport} ({arrival.code})
        </span>
      </div>
    </div>
  );
}

export default FlightRoute;
