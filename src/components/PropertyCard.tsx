
import { Heart, Star, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface Property {
  id: number;
  title: string;
  location: string;
  city: string;
  price: number;
  rating: number;
  reviews: number;
  images: string[];
  type: string;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  host: {
    name: string;
    avatar: string;
    superhost: boolean;
  };
}

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/property/${property.id}`);
  };

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/property/${property.id}`);
  };

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Handle wishlist functionality here
  };

  return (
    <Card className="property-card group cursor-pointer" onClick={handleCardClick}>
      <div className="relative">
        <img
          src={`https://images.unsplash.com/${property.images[0]}?w=400&h=300&fit=crop`}
          alt={property.title}
          className="w-full h-48 object-cover"
        />
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white text-gray-700 rounded-full"
          onClick={handleHeartClick}
        >
          <Heart className="w-4 h-4" />
        </Button>
        {property.host.superhost && (
          <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-full text-xs font-medium text-gray-700">
            Superhost
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">
              <MapPin className="w-3 h-3" />
              <span>{property.city}</span>
            </div>
            <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-coral-600 transition-colors">
              {property.title}
            </h3>
          </div>
          <div className="flex items-center gap-1 ml-2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{property.rating}</span>
            <span className="text-sm text-gray-500">({property.reviews})</span>
          </div>
        </div>
        
        <div className="text-sm text-gray-500 mb-3">
          {property.type} • {property.guests} guests • {property.bedrooms} bed{property.bedrooms > 1 ? 's' : ''} • {property.bathrooms} bath{property.bathrooms > 1 ? 's' : ''}
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-gray-900">${property.price}</span>
            <span className="text-sm text-gray-500"> / night</span>
          </div>
          <Button 
            size="sm" 
            className="bg-coral-500 hover:bg-coral-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleViewDetails}
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
