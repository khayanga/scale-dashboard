// Programming Task: Weighing Scale Monitoring Dashboard
// Objective:
// Create a simple dashboard that visualizes and tracks the status of digital weighing scales installed at different locations across the country.

// Key Features Required:

// Plot recent weight readings and operational status.


// Sample Json
import { MapPin, Home, Scale, User} from 'lucide-react';


export const navItems=[
    {
      title: "Dashboard",
      url: "/",
      icon: Home,
    },
    {
      title: "Scales",
      url: "/scales",
      icon: Scale, 
    },
    // {
    //   title: "Sites",
    //   url: "/sites",
    //   icon: MapPin,
    // },
    

]
export const scaleData = [
  {
    scale_id: "SCL001",
    location_name: "Nairobi Central",
    latitude: -1.2921,
    longitude: 36.8219,
    last_maintenance: "2025-04-10",
    status: "operational",
    last_weight_reading: 1234.5,
    last_updated: "2025-05-23T10:20:00",
  },
  {
    scale_id: "SCL002",
    location_name: "Mombasa Port",
    latitude: -4.0435,
    longitude: 39.6682,
    last_maintenance: "2025-03-15",
    status: "offline",
    last_weight_reading: 0.0,
    last_updated: "2025-05-20T08:15:00",
  },
  {
    scale_id: "SCL003",
    location_name: "Nairobi West",
    latitude: -1.3204,
    longitude: 36.8150,
    last_maintenance: "2025-03-15",
    status: "maintenance",
    last_weight_reading: 1024.0,
    last_updated: "2025-05-20T08:15:00",
  },
  {
    scale_id: "SCL004",
    location_name: "Kisumu Lakeside",
    latitude: -0.0917,
    longitude: 34.7679,
    last_maintenance: "2025-02-28",
    status: "error",
    last_weight_reading: 0.0,
    last_updated: "2025-05-21T12:45:00",
  },
  {
    scale_id: "SCL005",
    location_name: "Eldoret Highway",
    latitude: 0.5143,
    longitude: 35.2698,
    last_maintenance: "2025-04-22",
    status: "operational",
    last_weight_reading: 1850.2,
    last_updated: "2025-05-22T16:40:00",
  },
  {
    scale_id: "SCL006",
    location_name: "Nakuru Town",
    latitude: -0.3031,
    longitude: 36.0800,
    last_maintenance: "2025-05-05",
    status: "operational",
    last_weight_reading: 2567.8,
    last_updated: "2025-05-23T09:30:00",
  },
  {
    scale_id: "SCL007",
    location_name: "Thika Weighbridge",
    latitude: -1.0333,
    longitude: 37.0833,
    last_maintenance: "2025-03-30",
    status: "operational",
    last_weight_reading: 975.3,
    last_updated: "2025-05-23T11:15:00",
  },
  {
    scale_id: "SCL008",
    location_name: "Malindi Coastal",
    latitude: -3.2138,
    longitude: 40.1169,
    last_maintenance: "2025-03-30",
    status: "offline",
    last_weight_reading: 0.0,
    last_updated: "2025-05-18T14:20:00",
  },
  {
    scale_id: "SCL009",
    location_name: "Naivasha Depot",
    latitude: -0.7176,
    longitude: 36.4306,
    last_maintenance: "2025-04-15",
    status: "maintenance",
    last_weight_reading: 1345.7,
    last_updated: "2025-05-22T10:30:00",
  }
];

export const cardData = [
  {
    title: "Total Scale Reading",
    value: "1200kg",
    description: "Readings for the last 24 Hours",
    icon: Scale,
    bgColor: "bg-yellow-100 "
  },
  {
    title: "Total No Scales",
    value: "9",
    description: "No of scales registered",
    icon: Scale,
    bgColor: "bg-white "
  },
  
  {
    title: "Sites",
    value: "9",
    description: "Sites registered",
    icon: MapPin,
    bgColor: "bg-red-100 "
  },
  {
    title: "Customers",
    value: "25",
    description: "Customers served",
    icon: User,
    bgColor: "bg-blue-100 "
  }
];
