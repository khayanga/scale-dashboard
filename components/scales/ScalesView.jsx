'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ScaleTable from './ScalesTable';
import { Search } from 'lucide-react';
import { scaleData } from '@/data';

// Using the same mock data from Index.tsx


const ScalesView = () => {
  const [selectedScale, setSelectedScale] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredScales, setFilteredScales] = useState(scaleData);
  const [selectedScaleId, setSelectedScaleId] = useState(undefined);

  // Filter scales based on selected filters and search term
  React.useEffect(() => {
    let result = [...scaleData];
    
    // Filter by location if not "all"
    if (selectedScale !== 'all') {
      result = result.filter(scale => scale.location_name.toLowerCase() === selectedScale.toLowerCase());
    }
    
    // Filter by status if not "all"
    if (statusFilter !== 'all') {
      result = result.filter(scale => scale.status === statusFilter);
    }
    
    // Filter by search term if provided
    if (searchTerm) {
      result = result.filter(scale => 
        scale.scale_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scale.location_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredScales(result);
  }, [selectedScale, statusFilter, searchTerm]);

  const handleScaleSelect = (scaleId) => {
    setSelectedScaleId(prevId => prevId === scaleId ? undefined : scaleId);
  };

 

  return (
    <div className="container mx-auto  ">
    
      <Card className=" border-0">
        <CardHeader>
          <CardTitle className="text-sky-500">Scale Details</CardTitle>
          <CardDescription>Comprehensive list of all weighing scales</CardDescription>
        </CardHeader>
        
        <CardContent>
           <div className="flex justify-between  items-center gap-4 mb-2">
            <div className="">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search scales..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className='flex gap-4'>
              <div className="">
              <Select value={selectedScale} onValueChange={setSelectedScale}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter by location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {Array.from(new Set(scaleData.map(s => s.location_name))).map((location) => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="operational">Operational</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            </div>
            
            
          </div>
          <ScaleTable 
            scales={filteredScales}
            onRowClick={handleScaleSelect}
            selectedScaleId={selectedScaleId} 
          />
        </CardContent>
      </Card>

    </div>
  );
};

export default ScalesView;