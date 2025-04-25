import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AirlineInfo from './AirlineInfo';
import FlightDetails from './FlightDetails';

export interface Flight {
  id: string; // Adding the id property to resolve the TypeScript error
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: string;
  airlines: {
    main: string;
    partners?: string[];
  };
  price: {
    amount: number;
    currency: string;
  };
  emissions: {
    amount: number;
    unit: string;
    status: string;
    percentage?: number;
  };
  segments: Array<{
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
    amenities: Array<{
      type: 'legroom' | 'usb' | 'wifi' | 'power' | 'video' | 'emissions';
      value: string;
      details?: string;
    }>;
  }>;
}

export interface FlightResultProps {
  flight: Flight;
  isRecommended?: boolean;
  className?: string;
  onClick?: () => void;
}

export function FlightResult({ flight, isRecommended = false, className, onClick }: FlightResultProps) {
  const [expanded, setExpanded] = useState(false);
  
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency,
      currencyDisplay: 'symbol',
    }).format(amount);
  };
  
  const getEmissionColor = (status: string) => {
    switch (status) {
      case 'High':
        return 'text-red-600';
      case 'Average':
        return 'text-amber-600';
      case 'Below-average':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const showPercentage = (percentage?: number) => {
    if (!percentage) return null;
    
    const formattedPercentage = percentage > 0 ? `+${percentage}%` : `${percentage}%`;
    return (
      <span className={percentage > 0 ? 'text-red-600' : 'text-green-600'}>
        {formattedPercentage}
      </span>
    );
  };

  return (
    <div 
      className={cn(
        "border rounded-lg shadow-sm overflow-hidden bg-white transition-all",
        expanded && "shadow-md",
        isRecommended && "border-blue-500 shadow-blue-100",
        className
      )}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <div className="p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
          <div className="flex items-center gap-3">
            <AirlineInfo 
              airline={flight.airlines.main}
              partners={flight.airlines.partners}
              logoSize="sm"
            />
            
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
              <div>
                <div className="flex items-center">
                  <span className="text-base font-bold">{flight.departureTime}</span>
                  <span className="mx-1 text-gray-400">–</span>
                  <span className="text-base font-bold">{flight.arrivalTime}</span>
                </div>
                <div className="text-xs text-gray-500">
                  {flight.duration}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Badge variant={flight.stops === "Non-stop" ? "outline" : "secondary"} className="mr-1 text-xs">
                  {flight.stops}
                </Badge>
                
                <div className="flex items-center">
                  <svg className="w-3 h-3 text-gray-500 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 14C8 14 10.5 16 12 16C13.5 16 16 14 16 14M8 10C8 10 10.5 8 12 8C13.5 8 16 10 16 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  <span className={cn("text-xs font-medium", getEmissionColor(flight.emissions.status))}>
                    {flight.emissions.amount} {flight.emissions.unit}
                  </span>
                  {flight.emissions.percentage !== undefined && (
                    <span className="text-xs ml-1">
                      {showPercentage(flight.emissions.percentage)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end space-y-1">
            <span className="text-base font-bold">
              {formatCurrency(flight.price.amount, flight.price.currency)}
            </span>
            <span className="text-xs text-gray-500">round trip</span>
            
            <Button 
              variant={isRecommended ? "default" : "outline"}
              size="sm"
              className={cn(
                "mt-1",
                isRecommended && "bg-blue-500 hover:bg-blue-600"
              )}
            >
              {isRecommended ? "Select flight" : "Select"}
            </Button>
          </div>
        </div>

        {expanded && (
          <div className="mt-4 border-t pt-3">
            <FlightDetails segments={flight.segments} />
          </div>
        )}
        
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 flex items-center justify-center w-full text-xs text-gray-600 hover:text-gray-900"
        >
          {expanded ? (
            <>
              <span className="mr-1">Hide details</span>
              <ChevronUp size={14} />
            </>
          ) : (
            <>
              <span className="mr-1">Show details</span>
              <ChevronDown size={14} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default FlightResult;
