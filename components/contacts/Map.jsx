"use client";
import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";

import L from "leaflet";

export default function MapComponent() {
  useEffect(() => {
    const target = document.querySelector("#map");
    if (!target) return;

    const map = L.map(target, {
      scrollWheelZoom: false, // Disable scrolling
    }).setView([41.72618552376832, 44.73880034258427], 17);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker([51.5, -0.09])
      .addTo(map)
      // .bindPopup('A popup content for the marker.')
      .openPopup();
    document.getElementsByClassName("leaflet-interactive")[0].src =
      "/assets/marker-icon.png";
  }, []);

  return (
    <div
      id="map"
      className="map contactMap"
      style={{ height: "50vh", PointerEvent: "none" }}
    ></div>
  );
}
