
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Flight } from './FlightResult';

interface CabinClassSelectorProps {
  flight: Flight | null;
}

const cabinClasses = [
  {
    name: 'Economy',
    price: 1,
    features: ['Standard seat', 'Carry-on bag', 'In-flight meal']
  },
  {
    name: 'Premium Economy',
    price: 1.5,
    features: ['Extra legroom', 'Priority boarding', 'Enhanced meal service']
  },
  {
    name: 'Business',
    price: 2.5,
    features: ['Lie-flat seat', 'Lounge access', 'Premium dining']
  }
];

export function CabinClassSelector({ flight }: CabinClassSelectorProps) {
  if (!flight) return null;

  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="font-semibold mb-4">Select Cabin Class</h3>
        
        <RadioGroup defaultValue="economy" className="space-y-4">
          {cabinClasses.map((cabinClass) => (
            <div key={cabinClass.name} className="flex items-start space-x-3 p-3 rounded-lg border">
              <RadioGroupItem value={cabinClass.name.toLowerCase()} id={cabinClass.name.toLowerCase()} />
              <div className="flex-1">
                <Label 
                  htmlFor={cabinClass.name.toLowerCase()}
                  className="font-medium"
                >
                  {cabinClass.name}
                </Label>
                <div className="text-sm text-gray-500 mt-1">
                  {cabinClass.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <span className="text-xs">•</span>
                      <span className="ml-1">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-2 font-semibold">
                  {new Intl.NumberFormat('en-GB', {
                    style: 'currency',
                    currency: flight.price.currency
                  }).format(flight.price.amount * cabinClass.price)}
                </div>
              </div>
            </div>
          ))}
        </RadioGroup>

        <Separator className="my-4" />
        
        <Button className="w-full">
          Continue Booking
        </Button>
      </CardContent>
    </Card>
  );
}

export default CabinClassSelector;
