import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, XCircle, HelpCircle, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const ScaleTable = ({ scales, selectedScaleId }) => {
  const [selectedScale, setSelectedScale] = React.useState(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogType, setDialogType] = React.useState('view');
  const [formData, setFormData] = React.useState({
    location_name: '',
    status: '',
    last_maintenance: '',
  });

  // Update form data when selected scale changes
  React.useEffect(() => {
    if (selectedScale) {
      setFormData({
        location_name: selectedScale.location_name,
        status: selectedScale.status,
        last_maintenance: selectedScale.last_maintenance,
      });
    }
  }, [selectedScale]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'operational':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'offline':
        return <XCircle className="h-4 w-4 text-gray-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'maintenance':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return <HelpCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      operational: 'bg-green-100 text-green-800 border-green-200',
      offline: 'bg-gray-100 text-gray-800 border-gray-200',
      error: 'bg-red-100 text-red-800 border-red-200',
      maintenance: 'bg-yellow-100 text-yellow-800 border-yellow-200'
    };
    return variants[status] || variants.offline;
  };

  const handleActionClick = (scale, actionType) => {
    setSelectedScale(scale);
    setDialogType(actionType);
    setDialogOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStatusChange = (value) => {
    setFormData(prev => ({
      ...prev,
      status: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setDialogOpen(false);
  };

  return (
    <div className="rounded-xl overflow-hidden border border-border">
      <Table>
        <TableHeader className="bg-muted/30">
          <TableRow>
            <TableHead className="w-[100px]">Scale ID</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Last Reading</TableHead>
            <TableHead className="text-right">Last Maintenance</TableHead>
            <TableHead className="text-right">Last Updated</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {scales.map((scale) => (
            <TableRow 
              key={scale.scale_id}
              
              className={selectedScaleId === scale.scale_id ? 'bg-muted/80' : ''}
            >
              <TableCell className="font-medium">{scale.scale_id}</TableCell>
              <TableCell>{scale.location_name}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {getStatusIcon(scale.status)}
                  <Badge variant="outline" className={getStatusBadge(scale.status)}>
                    {scale.status.charAt(0).toUpperCase() + scale.status.slice(1)}
                  </Badge>
                </div>
              </TableCell>
              <TableCell className="text-right">
                {scale.last_weight_reading > 0 ? `${scale.last_weight_reading.toLocaleString()} kg` : 'N/A'}
              </TableCell>
              <TableCell className="text-right">{formatDate(scale.last_maintenance)}</TableCell>
              <TableCell className="text-right">{formatDateTime(scale.last_updated)}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0" onClick={(e) => e.stopPropagation()}>
                      <MoreHorizontal />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">      
                    <DropdownMenuItem onClick={(e) => {
                      e.stopPropagation();
                      handleActionClick(scale, 'view');
                    }}>
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => {
                      e.stopPropagation();
                      handleActionClick(scale, 'edit');
                    }}>
                      Edit
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialogType === 'view' ? 'View Scale Details' : 'Edit Scale Details'}
            </DialogTitle>
          </DialogHeader>
          
          {selectedScale && dialogType === 'view' && (
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Scale ID: {selectedScale.scale_id}</h3>
                <p className="text-sm text-muted-foreground">Location: {selectedScale.location_name}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Status</p>
                  <p className="text-sm">{selectedScale.status}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Last Reading</p>
                  <p className="text-sm">
                    {selectedScale.last_weight_reading > 0 ? 
                      `${selectedScale.last_weight_reading.toLocaleString()} kg` : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Last Maintenance</p>
                  <p className="text-sm">{formatDate(selectedScale.last_maintenance)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Last Updated</p>
                  <p className="text-sm">{formatDateTime(selectedScale.last_updated)}</p>
                </div>
              </div>
            </div>
          )}

          {selectedScale && dialogType === 'edit' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Scale ID</Label>
                <Input value={selectedScale.scale_id} disabled />
              </div>

              <div>
                <Label htmlFor="location_name">Location Name</Label>
                <Input
                  id="location_name"
                  name="location_name"
                  value={formData.location_name}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={handleStatusChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="operational">Operational</SelectItem>
                    <SelectItem value="offline">Offline</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="last_maintenance">Last Maintenance Date</Label>
                <Input
                  id="last_maintenance"
                  name="last_maintenance"
                  type="date"
                  value={formData.last_maintenance}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ScaleTable;