"use client";
import Cards from "@/components/dashboard/Cards";
import { ScaleStatusChart } from "@/components/dashboard/PieChart";
import { WeightGraph } from "@/components/dashboard/WeightGraph";
import Decoration from "@/components/Decoration";
import MapView from "@/components/MapView";
import { scaleData } from "@/data";

import React, { useState } from "react";
export default function Home() {
  const [selectedScaleId, setSelectedScaleId] = useState(undefined);

  const handleScaleSelect = (scaleId) => {
    setSelectedScaleId((prevId) => (prevId === scaleId ? undefined : scaleId));
  };
  return (
    <main className=" px-4 flex min-h-screen w-full flex-col gap-4  ">
      <section className=" md:py-8 py-4 px-4 relative overflow-hidden rounded-md">
        <Decoration />
        <h1 className="dark:text-gray-800 text-white md:text-2xl tracking-wide font-bold relative z-20">
          Welcome Back User!
        </h1>
        <p className="dark:text-gray-700 text-white  mb-3 relative z-20">
          This is your starting point for managing and monitoring your Scale
          applications.
        </p>

        <Cards />
      </section>

      <section className="px-2  ">
        <div className="flex flex-col sm:flex-row gap-4 mt-4  mb-2">
          <div className="md:w-1/2 mt-2">
            <WeightGraph />
          </div>
          <div className="md:w-1/2 mt-2">
            <ScaleStatusChart />
          </div>
        </div>

        <div className="md:mt-8 mt-4">
          <h2 className="text-blue-400 text-lg font-semibold ">
            Scale Locations
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm tracking-wide">
            Click on a pin to view its details and status.
          </p>
        </div>
        <MapView
          scales={scaleData}
          selectedScaleId={selectedScaleId}
          onScaleSelect={handleScaleSelect}
        />
      </section>
    </main>
  );
}
