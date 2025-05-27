"use client";
import React, { useEffect, useRef, useState } from "react";

// Global variable to track script loading
let googleMapsScriptLoading = false;

const MapView = ({ scales, selectedScaleId, onScaleSelect }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markersRef = useRef({});
  const [mapLoaded, setMapLoaded] = useState(false);
  const [scriptLoadError, setScriptLoadError] = useState(false);

  // Load Google Maps API script
  useEffect(() => {
    if (window.google) {
      setMapLoaded(true);
      return;
    }

    if (googleMapsScriptLoading) return;

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.error("Google Maps API key is not defined");
      setScriptLoadError(true);
      return;
    }

    googleMapsScriptLoading = true;

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      setMapLoaded(true);
      googleMapsScriptLoading = false;
    };

    script.onerror = () => {
      console.error("Failed to load Google Maps API");
      setScriptLoadError(true);
      googleMapsScriptLoading = false;
    };

    document.head.appendChild(script);

    return () => {
      // Clean up script if component unmounts before loading completes
      if (script.parentNode && !window.google) {
        document.head.removeChild(script);
        googleMapsScriptLoading = false;
      }
    };
  }, []);

  // Initialize map when API is loaded
  useEffect(() => {
    if (!mapLoaded || !mapContainer.current) return;

    map.current = new window.google.maps.Map(mapContainer.current, {
      center: { lat: -1.2921, lng: 36.8219 }, // Default center (Nairobi)
      zoom: 5,
      streetViewControl: false,
      mapTypeControl: false,
    });

    updateMarkers();

    return () => {
      // Clean up map instance
      if (map.current) {
        map.current = null;
      }
    };
  }, [mapLoaded]);

  // Update markers when scales or selectedScaleId changes
  useEffect(() => {
    if (map.current && mapLoaded) {
      updateMarkers();
    }
  }, [scales, selectedScaleId, mapLoaded]);

  const updateMarkers = () => {
    // Clear existing markers
    Object.values(markersRef.current).forEach((marker) => marker.setMap(null));
    markersRef.current = {};

    // Add new markers with pin icons
    scales.forEach((scale) => {
      if (!scale.latitude || !scale.longitude) return;

      const marker = new window.google.maps.Marker({
        position: { lat: scale.latitude, lng: scale.longitude },
        map: map.current,
        icon: {
          url: getPinIcon(scale.status),
          scaledSize: new window.google.maps.Size(30, 40),
          anchor: new window.google.maps.Point(15, 40),
        },
        title: scale.location_name,
      });

      // Add click event
      marker.addListener("click", () => {
        if (onScaleSelect) onScaleSelect(scale.scale_id);
      });

      // Create info window
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
    <div class=""  background-color: #1f2937; border-radius: 8px;">
      <h3 style="font-weight: bold; margin-bottom: 4px;">${
        scale.location_name
      }</h3>
      <p style="margin-bottom: 4px;">${scale.scale_id}</p>
      <p style="margin-bottom: 4px; color: ${getStatusColor(
        scale.status
      )}; text-transform: capitalize;">
        ${scale.status}
      </p>
      <p>${
        scale.last_weight_reading > 0
          ? scale.last_weight_reading + " kg"
          : "No reading"
      }</p>
    </div>
  `,
      });

      // Helper function for status colors
      function getStatusColor(status) {
        const colors = {
          operational: "#34d399", // green-400
          offline: "#9ca3af", // gray-400
          maintenance: "#fbbf24", // yellow-400
          error: "#f87171", // red-400
        };
        return colors[status] || "#60a5fa"; // blue-400 as default
      }

      // Show info window on hover
      marker.addListener("mouseover", () =>
        infoWindow.open(map.current, marker)
      );
      marker.addListener("mouseout", () => infoWindow.close());

      markersRef.current[scale.scale_id] = marker;
    });

    // Fit bounds to all markers
    if (scales.length > 0 && scales.some((s) => s.latitude && s.longitude)) {
      const bounds = new window.google.maps.LatLngBounds();
      scales.forEach((scale) => {
        if (scale.latitude && scale.longitude) {
          bounds.extend(
            new window.google.maps.LatLng(scale.latitude, scale.longitude)
          );
        }
      });
      map.current.fitBounds(bounds);
    }

    // Center on selected marker
    if (selectedScaleId) {
      const selected = scales.find((s) => s.scale_id === selectedScaleId);
      if (selected && selected.latitude && selected.longitude) {
        map.current.panTo({ lat: selected.latitude, lng: selected.longitude });
        map.current.setZoom(12);
      }
    }
  };

  // Returns SVG for colored pin markers
  const getPinIcon = (status) => {
    const color = getMarkerColorHex(status);
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    `)}`;
  };

  const getMarkerColorHex = (status) => {
    switch (status) {
      case "operational":
        return "#10B981"; // green-500
      case "offline":
        return "#6B7280"; // gray-500
      case "error":
        return "#EF4444"; // red-500
      case "maintenance":
        return "#F59E0B"; // yellow-500
      default:
        return "#3B82F6"; // blue-500
    }
  };

  const getStatusTextColorClass = (status) => {
    switch (status) {
      case "operational":
        return "text-green-500";
      case "offline":
        return "text-gray-500";
      case "error":
        return "text-red-500";
      case "maintenance":
        return "text-yellow-500";
      default:
        return "text-blue-500";
    }
  };

  if (scriptLoadError) {
    return (
      <div className="relative w-full h-[500px] rounded-xl overflow-hidden shadow-lg bg-gray-100 flex items-center justify-center">
        <p className="text-red-500">
          Failed to load Google Maps. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[500px] rounded-xl overflow-hidden shadow-lg">
      {!mapLoaded && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
          <p className="text-gray-700">Loading map...</p>
        </div>
      )}
      <div
        ref={mapContainer}
        className="absolute inset-0"
        style={{ display: mapLoaded ? "block" : "none" }}
      />
    </div>
  );
};

export default MapView;
