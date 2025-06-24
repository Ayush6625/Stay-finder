
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import SearchBar from '@/components/SearchBar';
import PropertyCard from '@/components/PropertyCard';
import { mockProperties } from '@/data/mockProperties';
import { User } from 'lucide-react';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    location: '',
    minPrice: '',
    maxPrice: '',
    propertyType: '',
    guests: '',
  });

  const filteredProperties = useMemo(() => {
    return mockProperties.filter(property => {
      const matchesSearch = !searchQuery || 
        property.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesLocation = !selectedFilters.location || 
        property.city.toLowerCase() === selectedFilters.location.toLowerCase();

      const matchesMinPrice = !selectedFilters.minPrice || 
        property.price >= parseInt(selectedFilters.minPrice);

      const matchesMaxPrice = !selectedFilters.maxPrice || 
        property.price <= parseInt(selectedFilters.maxPrice);

      const matchesPropertyType = !selectedFilters.propertyType || 
        property.type.toLowerCase() === selectedFilters.propertyType.toLowerCase();

      const matchesGuests = !selectedFilters.guests || 
        property.guests >= parseInt(selectedFilters.guests);

      return matchesSearch && matchesLocation && matchesMinPrice && 
             matchesMaxPrice && matchesPropertyType && matchesGuests;
    });
  }, [searchQuery, selectedFilters]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleFiltersChange = (filters: any) => {
    setSelectedFilters(filters);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-coral-100 via-warm-50 to-coral-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-coral-500">StayFinder</h1>
            </div>
            
            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-coral-500 font-medium">
                Home
              </Link>
              <Link to="/explore" className="text-gray-700 hover:text-coral-500 font-medium">
                Explore
              </Link>
              <Link to="/host" className="text-gray-700 hover:text-coral-500 font-medium">
                Host
              </Link>
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center gap-4">
              <Link to="/auth">
                <Button variant="ghost" className="text-gray-700 hover:text-coral-500">
                  Sign In
                </Button>
              </Link>
              <Link to="/auth">
                <Button className="bg-coral-500 hover:bg-coral-600 text-white">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-coral-400 via-coral-500 to-coral-600">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Find Your Perfect Stay
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto drop-shadow">
            Discover unique places to stay around the world, from cozy apartments to luxury villas
          </p>
          
          <SearchBar 
            onSearch={handleSearchChange}
            onFiltersChange={handleFiltersChange}
          />
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-gray-800">
              {searchQuery || Object.values(selectedFilters).some(filter => filter) 
                ? `Found ${filteredProperties.length} properties` 
                : 'Popular Destinations'
              }
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">No properties found matching your criteria.</p>
                <p className="text-gray-400 mt-2">Try adjusting your search or filters.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
