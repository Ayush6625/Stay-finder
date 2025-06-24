
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Star, MapPin, Users, Bed, Bath, Wifi, Car, Utensils, Waves } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { mockProperties } from '@/data/mockProperties';
import { useState } from 'react';

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const property = mockProperties.find(p => p.id === parseInt(id || '0'));
  
  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Property not found</h2>
          <Button onClick={() => navigate('/')} className="bg-coral-500 hover:bg-coral-600">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const amenityIcons: { [key: string]: any } = {
    'WiFi': Wifi,
    'Kitchen': Utensils,
    'Parking': Car,
    'Pool': Waves,
    'Beach Access': Waves,
    'Hot Tub': Waves,
  };

  return (
    <div className="min-h-screen bg-warm-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/')}
                className="mr-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <h1 className="text-2xl font-bold text-coral-600">StayFinder</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-gray-700 hover:text-coral-600">
                Sign In
              </Button>
              <Button className="bg-coral-500 hover:bg-coral-600 text-white">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Property Images */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
          <div className="relative">
            <img
              src={`https://images.unsplash.com/${property.images[currentImageIndex]}?w=800&h=600&fit=crop`}
              alt={property.title}
              className="w-full h-96 object-cover rounded-lg"
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white text-gray-700 rounded-full"
            >
              <Heart className="w-5 h-5" />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {property.images.slice(0, 4).map((image, index) => (
              <img
                key={index}
                src={`https://images.unsplash.com/${image}?w=400&h=300&fit=crop`}
                alt={`${property.title} ${index + 1}`}
                className={`w-full h-44 object-cover rounded-lg cursor-pointer transition-opacity ${
                  currentImageIndex === index ? 'opacity-100 ring-2 ring-coral-500' : 'opacity-70 hover:opacity-100'
                }`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Property Details */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{property.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-lg font-semibold">{property.rating}</span>
                  <span className="text-gray-500">({property.reviews} reviews)</span>
                </div>
              </div>
              
              {property.host.superhost && (
                <div className="inline-block bg-coral-100 text-coral-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
                  Superhost
                </div>
              )}
            </div>

            {/* Property Info */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="flex flex-col items-center">
                    <Users className="w-6 h-6 text-coral-500 mb-2" />
                    <span className="text-lg font-semibold">{property.guests}</span>
                    <span className="text-sm text-gray-500">Guests</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Bed className="w-6 h-6 text-coral-500 mb-2" />
                    <span className="text-lg font-semibold">{property.bedrooms}</span>
                    <span className="text-sm text-gray-500">Bedrooms</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Bath className="w-6 h-6 text-coral-500 mb-2" />
                    <span className="text-lg font-semibold">{property.bathrooms}</span>
                    <span className="text-sm text-gray-500">Bathrooms</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">What this place offers</h3>
                <div className="grid grid-cols-2 gap-4">
                  {property.amenities.map((amenity, index) => {
                    const IconComponent = amenityIcons[amenity] || MapPin;
                    return (
                      <div key={index} className="flex items-center gap-3">
                        <IconComponent className="w-5 h-5 text-coral-500" />
                        <span>{amenity}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Host Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Meet your host</h3>
                <div className="flex items-center gap-4">
                  <img
                    src={property.host.avatar}
                    alt={property.host.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-lg">{property.host.name}</h4>
                    {property.host.superhost && (
                      <span className="text-coral-600 text-sm">Superhost</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">${property.price}</span>
                    <span className="text-gray-500">/ night</span>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Check-in
                    </label>
                    <input
                      type="date"
                      className="w-full p-3 border border-gray-200 rounded-lg focus:border-coral-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Check-out
                    </label>
                    <input
                      type="date"
                      className="w-full p-3 border border-gray-200 rounded-lg focus:border-coral-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Guests
                    </label>
                    <select className="w-full p-3 border border-gray-200 rounded-lg focus:border-coral-500 focus:outline-none">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <option key={num} value={num}>
                          {num} Guest{num > 1 ? 's' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <Button className="w-full bg-coral-500 hover:bg-coral-600 text-white py-3 text-lg">
                  Reserve
                </Button>
                
                <p className="text-center text-sm text-gray-500 mt-4">
                  You won't be charged yet
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
