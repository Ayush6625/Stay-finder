
import { useState } from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFiltersChange: (filters: {
    location: string;
    minPrice: string;
    maxPrice: string;
    propertyType: string;
    guests: string;
  }) => void;
}

const SearchBar = ({ onSearch, onFiltersChange }: SearchBarProps) => {
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  const handleSearch = () => {
    console.log('Searching with filters:', {
      location,
      checkIn,
      checkOut,
      guests,
      minPrice,
      maxPrice
    });
    
    // Pass the location as search query
    onSearch(location);
    
    // Pass other filters separately
    onFiltersChange({
      location,
      minPrice: minPrice.toString(),
      maxPrice: maxPrice.toString(),
      propertyType: '',
      guests: guests.toString()
    });
  };

  return (
    <Card className="bg-white/95 backdrop-blur-sm shadow-2xl border-0">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by city (e.g., Malibu, Aspen)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10 h-12 border-gray-200 focus:border-coral-500 bg-white"
            />
          </div>
          
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              type="date"
              placeholder="Check-in"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="pl-10 h-12 border-gray-200 focus:border-coral-500 bg-white"
            />
          </div>
          
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              type="date"
              placeholder="Check-out"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="pl-10 h-12 border-gray-200 focus:border-coral-500 bg-white"
            />
          </div>
          
          <div className="relative">
            <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <select
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full h-12 pl-10 pr-4 border border-gray-200 rounded-md focus:border-coral-500 focus:outline-none focus:ring-2 focus:ring-coral-500/20 bg-white"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <option key={num} value={num}>
                  {num} Guest{num > 1 ? 's' : ''}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Price Range Filters */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="text-coral-600 hover:text-coral-700 font-medium text-sm transition-colors"
          >
            {showFilters ? 'Hide' : 'Show'} Price Filters
          </button>
          
          <Button 
            onClick={handleSearch}
            className="bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 text-white px-8 h-12 flex items-center gap-2 shadow-lg transition-all duration-200"
          >
            <Search className="w-4 h-4" />
            Search
          </Button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Min Price (per night)
              </label>
              <Input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                className="border-gray-200 focus:border-coral-500 bg-white"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Price (per night)
              </label>
              <Input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="border-gray-200 focus:border-coral-500 bg-white"
                min="0"
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SearchBar;
