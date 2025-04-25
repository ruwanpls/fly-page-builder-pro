
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FlightResult, Flight } from "@/components/FlightResult";
import { ChevronDown, ChevronUp, Clock, Plane, MapPin } from "lucide-react";

// Sample flight data based on the provided screenshot
const flightData: Flight[] = [
  {
    id: "lh-921-747",
    departureTime: "06:30",
    arrivalTime: "12:40",
    duration: "12h 35m",
    stops: "1 stop",
    price: {
      amount: 483,
      currency: "GBP",
    },
    emissions: {
      amount: 626,
      unit: "kg CO2e",
      percentage: 11,
      status: "Average",
    },
    airlines: {
      main: "Lufthansa",
      partners: [],
    },
    segments: [
      {
        departure: {
          time: "06:30",
          airport: "Heathrow Airport",
          code: "LHR",
        },
        arrival: {
          time: "09:05",
          airport: "Frankfurt Airport",
          code: "FRA",
        },
        duration: "1 hr 35 min",
        airline: "Lufthansa",
        flightNumber: "LH 921",
        aircraft: "Airbus A320neo",
        amenities: [
          {
            type: "legroom",
            value: "Below-average legroom (74 cm)",
            details: "Standard economy seat with slightly reduced legroom compared to industry average",
          },
          {
            type: "usb",
            value: "In-seat USB outlet",
            details: "USB Type-A charging port available at each seat",
          },
          {
            type: "emissions",
            value: "Emissions estimate: 67 kg CO2e",
            details: "This is the estimated carbon emissions for this flight segment only",
          },
        ],
      },
      {
        departure: {
          time: "10:25",
          airport: "Frankfurt Airport",
          code: "FRA",
        },
        arrival: {
          time: "12:40",
          airport: "San Francisco International Airport",
          code: "SFO",
        },
        duration: "11 hr 15 min",
        airline: "Lufthansa",
        flightNumber: "LH 454",
        aircraft: "Boeing 747",
        amenities: [
          {
            type: "legroom",
            value: "Average legroom (79 cm)",
            details: "Standard economy seat with industry average legroom",
          },
          {
            type: "wifi",
            value: "Wi-Fi for a fee",
            details: "In-flight Wi-Fi available for purchase. Prices start from €8",
          },
          {
            type: "power",
            value: "In-seat power and USB outlets",
            details: "Both standard power outlet and USB charging available at each seat",
          },
          {
            type: "video",
            value: "On-demand video",
            details: "Personal entertainment system with movies, TV shows, and games",
          },
          {
            type: "emissions",
            value: "Emissions estimate: 559 kg CO2e",
            details: "This is the estimated carbon emissions for this flight segment only",
          },
        ],
      },
    ],
  },
  {
    id: "ua-lh-os-sn",
    departureTime: "10:35",
    arrivalTime: "13:40",
    duration: "11h 5m",
    stops: "Non-stop",
    price: {
      amount: 506,
      currency: "GBP",
    },
    emissions: {
      amount: 826,
      unit: "kg CO2e",
      percentage: 47,
      status: "High",
    },
    airlines: {
      main: "United",
      partners: ["Lufthansa", "Austrian", "Brussels Airlines"],
    },
    segments: [
      {
        departure: {
          time: "10:35",
          airport: "Heathrow Airport",
          code: "LHR",
        },
        arrival: {
          time: "13:40",
          airport: "San Francisco International Airport",
          code: "SFO",
        },
        duration: "11 hr 5 min",
        airline: "United",
        flightNumber: "UA 954",
        aircraft: "Boeing 777-300ER",
        amenities: [
          {
            type: "legroom",
            value: "Standard legroom (78 cm)",
            details: "Standard economy seat configuration",
          },
          {
            type: "wifi",
            value: "Wi-Fi available",
            details: "In-flight Wi-Fi available for purchase",
          },
          {
            type: "power",
            value: "In-seat power outlets",
            details: "Power outlets available at each seat",
          },
          {
            type: "video",
            value: "Personal entertainment system",
            details: "On-demand movies, TV shows, and games",
          },
          {
            type: "emissions",
            value: "Emissions estimate: 826 kg CO2e",
            details: "This flight produces 47% more emissions than the average for this route",
          },
        ],
      },
    ],
  },
  {
    id: "vs-dl-af-klm",
    departureTime: "11:15",
    arrivalTime: "14:15",
    duration: "11h",
    stops: "Non-stop",
    price: {
      amount: 522,
      currency: "GBP",
    },
    emissions: {
      amount: 555,
      unit: "kg CO2e",
      status: "Average",
    },
    airlines: {
      main: "Virgin Atlantic",
      partners: ["Delta", "Air France", "KLM"],
    },
    segments: [
      {
        departure: {
          time: "11:15",
          airport: "Heathrow Airport",
          code: "LHR",
        },
        arrival: {
          time: "14:15",
          airport: "San Francisco International Airport",
          code: "SFO",
        },
        duration: "11 hr",
        airline: "Virgin Atlantic",
        flightNumber: "VS 41",
        aircraft: "Airbus A350-1000",
        amenities: [
          {
            type: "legroom",
            value: "Extra legroom (81 cm)",
            details: "More spacious than industry average",
          },
          {
            type: "wifi",
            value: "High-speed Wi-Fi",
            details: "Complimentary messaging, paid browsing and streaming options",
          },
          {
            type: "power",
            value: "USB and power outlets",
            details: "Both USB and standard power outlets available",
          },
          {
            type: "video",
            value: "Enhanced entertainment system",
            details: "Large HD touchscreen with hundreds of hours of entertainment",
          },
          {
            type: "emissions",
            value: "Emissions estimate: 555 kg CO2e",
            details: "This is in line with the industry average for this route",
          },
        ],
      },
    ],
  },
  {
    id: "ba-ib-aa-ay",
    departureTime: "10:45",
    arrivalTime: "13:50",
    duration: "11h 5m",
    stops: "Non-stop",
    price: {
      amount: 564,
      currency: "GBP",
    },
    emissions: {
      amount: 555,
      unit: "kg CO2e",
      status: "Average",
    },
    airlines: {
      main: "British Airways",
      partners: ["Iberia", "American", "Finnair"],
    },
    segments: [
      {
        departure: {
          time: "10:45",
          airport: "Heathrow Airport",
          code: "LHR",
        },
        arrival: {
          time: "13:50",
          airport: "San Francisco International Airport",
          code: "SFO",
        },
        duration: "11 hr 5 min",
        airline: "British Airways",
        flightNumber: "BA 287",
        aircraft: "Boeing 777-300ER",
        amenities: [
          {
            type: "legroom",
            value: "Standard legroom (78 cm)",
            details: "Industry standard seat pitch",
          },
          {
            type: "wifi",
            value: "Wi-Fi available",
            details: "In-flight Wi-Fi available for purchase",
          },
          {
            type: "power",
            value: "Power outlets available",
            details: "UK/US/EU compatible power outlets",
          },
          {
            type: "video",
            value: "On-demand entertainment",
            details: "Personal TV with movies, TV shows, audio, and games",
          },
          {
            type: "emissions",
            value: "Emissions estimate: 555 kg CO2e",
            details: "Industry average emissions for this route",
          },
        ],
      },
    ],
  },
];

export default function Index() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'recommended' | 'price' | 'duration' | 'emissions'>('recommended');
  
  // Sort flights based on selected criteria
  const sortedFlights = [...flightData].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price.amount - b.price.amount;
      case 'duration':
        return a.duration.localeCompare(b.duration);
      case 'emissions':
        return a.emissions.amount - b.emissions.amount;
      case 'recommended':
      default:
        // Simple recommendation algorithm based on a weighted score of price, duration and emissions
        const scoreA = a.price.amount * 0.4 + parseInt(a.duration) * 0.3 + a.emissions.amount * 0.3;
        const scoreB = b.price.amount * 0.4 + parseInt(b.duration) * 0.3 + b.emissions.amount * 0.3;
        return scoreA - scoreB;
    }
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <div className="flex items-center mb-4 sm:mb-0">
            <div className="w-10 h-10 rounded-full mr-4 flex items-center justify-center bg-blue-50">
              <Plane className="text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Flight Results</h1>
              <p className="text-sm text-gray-500">London to San Francisco • Wed 21 May</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              Filter <ChevronDown className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              Airlines <ChevronDown className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              Times <ChevronDown className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div className="flex gap-4">
                    <Button 
                      variant={sortBy === 'recommended' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSortBy('recommended')}
                    >
                      Recommended
                    </Button>
                    <Button 
                      variant={sortBy === 'price' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSortBy('price')}
                    >
                      Cheapest
                    </Button>
                    <Button 
                      variant={sortBy === 'duration' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSortBy('duration')}
                    >
                      Fastest
                    </Button>
                    <Button 
                      variant={sortBy === 'emissions' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSortBy('emissions')}
                    >
                      Greenest
                    </Button>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    {flightData.length} results
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              {sortedFlights.map((flight, index) => (
                <FlightResult 
                  key={flight.id}
                  flight={flight}
                  isRecommended={sortBy === 'recommended' && index === 0}
                />
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">Route Details</h3>
                  <div className="flex items-center mb-4">
                    <MapPin className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-sm">LHR - SFO</span>
                  </div>
                  
                  <h3 className="font-semibold mb-2">Departure</h3>
                  <p className="text-sm text-gray-600 mb-4">Wed 21 May, 2025</p>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Average Price:</span>
                      <span className="text-sm font-medium">£518</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Average Duration:</span>
                      <span className="text-sm font-medium">11h 20m</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Average CO2:</span>
                      <span className="text-sm font-medium">640 kg</span>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <Button className="w-full">Change Search</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t mt-12">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-gray-500">
            © 2025 Fly Search. All flights shown include taxes and basic fees.
          </p>
        </div>
      </footer>
    </div>
  );
}
