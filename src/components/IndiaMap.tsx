import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ComposableMap,
  Geographies,
  Geography
} from 'react-simple-maps';
import { StateCode, STATE_CULTURAL_DATA } from '../data/stateData';
import { Loader2, Sparkles } from 'lucide-react';

// Using a reliable GeoJSON for India States from Highcharts
const INDIA_GEOJSON_URL = "https://code.highcharts.com/mapdata/countries/in/in-all.geo.json";

interface IndiaMapProps {
  onStateClick: (code: StateCode) => void;
  selectedState: StateCode | null;
}

const IndiaMap: React.FC<IndiaMapProps> = ({ onStateClick, selectedState }) => {
  const [tooltipContent, setTooltipContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [geoData, setGeoData] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
   async function loadIndiaMap() {
  try {
    const response = await fetch(
      "https://code.highcharts.com/mapdata/countries/in/in-all.geo.json"
    );

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const mapData = await response.json();

    renderMap(mapData);

  } catch (error) {
    console.error("Map loading failed:", error);

    document.getElementById("map").innerHTML =
      "Failed to load map.";
  }
}
  }, []);

  return (
    <div className="relative w-full aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl bg-dark-bg/40 backdrop-blur-sm group">
      {/* Glow Backdrop */}
      <div className="absolute inset-0 bg-saffron/5 blur-[120px] rounded-full pointer-events-none opacity-50" />
      
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-20 bg-dark-bg/20 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 text-saffron animate-spin" />
            <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em]">Synchronizing Heritage Map</p>
          </div>
        </div>
      )}

      {geoData && (
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 900,
            center: [82, 22] // Centered on India
          }}
          className="w-full h-full"
        >
          <Geographies geography={geoData}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const stateName = geo.properties.name;
                const stateCode = geo.properties['iso3166-2'] as StateCode;
                const isSelected = stateCode === selectedState;
                const hasData = stateCode in STATE_CULTURAL_DATA;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {
                      setTooltipContent(stateName);
                    }}
                    onMouseLeave={() => {
                      setTooltipContent(null);
                    }}
                    onClick={() => {
                      if (hasData) {
                        onStateClick(stateCode);
                      }
                    }}
                    style={{
                      default: {
                        fill: isSelected ? "#FF9933" : "#1a1a1a",
                        stroke: isSelected ? "#ffffff" : "#333333",
                        strokeWidth: isSelected ? 1 : 0.5,
                        outline: "none",
                        transition: "all 0.3s ease",
                        cursor: hasData ? "pointer" : "default",
                      },
                      hover: {
                        fill: hasData ? "#FF9933" : "#2a2a2a",
                        stroke: "#ffffff",
                        strokeWidth: 1,
                        outline: "none",
                        filter: hasData ? "drop-shadow(0 0 8px rgba(255, 153, 51, 0.5))" : "none",
                        transition: "all 0.3s ease",
                        cursor: hasData ? "pointer" : "default",
                      },
                      pressed: {
                        fill: "#FF9933",
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
      )}

      {/* Tooltip */}
      <AnimatePresence>
        {tooltipContent && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 px-4 py-2 glass rounded-full border-white/10 pointer-events-none z-30"
          >
            <span className="text-xs font-bold text-white tracking-widest uppercase">{tooltipContent}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Labels */}
      <div className="absolute top-12 left-12 flex flex-col gap-1 pointer-events-none">
        <div className="flex items-center gap-3">
          <div className="w-8 h-[1px] bg-white/20" />
          <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">Vectored Topology</span>
        </div>
        <p className="text-xs serif italic text-saffron opacity-60">Interactive Cultural Explorer</p>
      </div>

      {/* Selected State Overlay */}
      <AnimatePresence>
        {selectedState && STATE_CULTURAL_DATA[selectedState] && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute top-12 right-12 text-right pointer-events-none glass p-6 rounded-3xl border-white/5"
          >
            <span className="text-[10px] font-bold text-saffron uppercase tracking-[0.3em] block mb-1">Focus Region</span>
            <h3 className="text-4xl serif font-bold tracking-tight glow-text">{STATE_CULTURAL_DATA[selectedState].name}</h3>
            <div className="mt-4 flex items-center justify-end gap-2 text-[10px] text-white/40 font-bold uppercase tracking-widest">
              <Sparkles className="w-3 h-3 text-saffron" />
              Active Experience
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Map Hint */}
      <div className="absolute bottom-12 right-12 flex flex-col items-end gap-1 pointer-events-none">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">Engine: Sans-Cloud Vector</span>
          <div className="w-8 h-[1px] bg-white/20" />
        </div>
        <p className="text-[9px] text-white/20 uppercase font-bold tracking-widest">Privacy-First Offline Visualization</p>
      </div>
    </div>
  );
};

export default IndiaMap;
