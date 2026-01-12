import { RWAProperty } from '../../data/mockData';
import { Building, MapPin, Users, DollarSign, Percent } from 'lucide-react';

interface RWACardProps {
  property: RWAProperty;
  onClick?: () => void;
}

export default function RWACard({ property, onClick }: RWACardProps) {
  const statusColors = {
    available: 'bg-semantic-success/20 text-semantic-success',
    tokenized: 'bg-accent-primary/20 text-accent-primary',
    occupied: 'bg-semantic-warning/20 text-semantic-warning',
  };

  return (
    <button
      onClick={onClick}
      className="w-full card card-hover overflow-hidden text-left group"
    >
      {/* Property Image */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={property.image}
          alt={property.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-caption font-medium ${statusColors[property.status]}`}>
            {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
          </span>
        </div>
        {property.type === 'property' && property.units && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-bg-base/80 backdrop-blur-sm rounded-full text-caption text-text-primary">
            <Building className="w-3 h-3" />
            {property.units} Units
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-body-lg font-semibold text-text-primary mb-1 truncate">
          {property.name}
        </h3>
        
        <div className="flex items-center gap-1 text-body-sm text-text-muted mb-3">
          <MapPin className="w-3 h-3" />
          {property.location}
        </div>

        <p className="text-body-sm text-text-secondary line-clamp-2 mb-4">
          {property.description}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          {property.tokenPrice && (
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-semantic-success" />
              <div>
                <div className="text-caption text-text-muted">Token Price</div>
                <div className="text-body-sm font-semibold text-text-primary">{property.tokenPrice}</div>
              </div>
            </div>
          )}
          {property.totalValue && (
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-accent-primary" />
              <div>
                <div className="text-caption text-text-muted">Total Value</div>
                <div className="text-body-sm font-semibold text-text-primary">{property.totalValue}</div>
              </div>
            </div>
          )}
          {property.occupancy !== undefined && (
            <div className="flex items-center gap-2">
              <Percent className="w-4 h-4 text-semantic-warning" />
              <div>
                <div className="text-caption text-text-muted">Occupancy</div>
                <div className="text-body-sm font-semibold text-text-primary">{property.occupancy}%</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </button>
  );
}
