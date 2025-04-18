import React, { useState } from 'react';
import { Plus, Minus, Calculator, Paintbrush, Layout } from 'lucide-react';

const HomeRenovationCalculator = () => {
  // Window treatment state
  const [windows, setWindows] = useState([
    { roomName: '', width: '', height: '', quantity: 1 }
  ]);
  
  // Painting state
  const [paintingAreas, setPaintingAreas] = useState([
    { roomName: '', length: '', height: '', walls: 1 }
  ]);
  
  // Flooring state
  const [flooringAreas, setFlooringAreas] = useState([
    { roomName: '', length: '', width: '' }
  ]);
  
  const [showEstimate, setShowEstimate] = useState(false);
  const [activeTab, setActiveTab] = useState('windows');

  // Product pricing data
  const blindTypes = {
    faux_cordless: { name: 'Faux Cordless Blinds', basePrice: 125, maxWidth: 96 },
    roller: { name: 'Roller Shades', basePrice: 150, maxWidth: 120 }
  };
  
  const paintTypes = {
    standard: { name: 'Standard Paint', pricePerSqFt: 2.50 },
    premium: { name: 'Premium Paint', pricePerSqFt: 3.75 }
  };
  
  const flooringTypes = {
    laminate: { name: 'Laminate', pricePerSqFt: 4.50 },
    hardwood: { name: 'Hardwood', pricePerSqFt: 8.75 },
    vinyl: { name: 'Luxury Vinyl', pricePerSqFt: 5.25 }
  };

  // Window treatment functions
  const addWindow = () => {
    setWindows([...windows, { roomName: '', width: '', height: '', quantity: 1 }]);
  };

  const removeWindow = (index) => {
    if (windows.length > 1) {
      setWindows(windows.filter((_, i) => i !== index));
    }
  };

  const updateWindow = (index, field, value) => {
    const newWindows = [...windows];
    newWindows[index][field] = value;
    setWindows(newWindows);
  };

  // Painting functions
  const addPaintingArea = () => {
    setPaintingAreas([...paintingAreas, { roomName: '', length: '', height: '', walls: 1 }]);
  };

  const removePaintingArea = (index) => {
    if (paintingAreas.length > 1) {
      setPaintingAreas(paintingAreas.filter((_, i) => i !== index));
    }
  };

  const updatePaintingArea = (index, field, value) => {
    const newPaintingAreas = [...paintingAreas];
    newPaintingAreas[index][field] = value;
    setPaintingAreas(newPaintingAreas);
  };

  // Flooring functions
  const addFlooringArea = () => {
    setFlooringAreas([...flooringAreas, { roomName: '', length: '', width: '' }]);
  };

  const removeFlooringArea = (index) => {
    if (flooringAreas.length > 1) {
      setFlooringAreas(flooringAreas.filter((_, i) => i !== index));
    }
  };

  const updateFlooringArea = (index, field, value) => {
    const newFlooringAreas = [...flooringAreas];
    newFlooringAreas[index][field] = value;
    setFlooringAreas(newFlooringAreas);
  };

  // Calculation functions
  const calculateWindowPrice = (width, height, basePrice) => {
    const sqft = (width * height) / 144;
    return Math.round(basePrice * sqft * 1.5);
  };

  const getWindowEstimates = () => {
    let estimates = {};
    for (const type in blindTypes) {
      let totalCost = 0;
      for (const window of windows) {
        if (window.width && window.height) {
          const price = calculateWindowPrice(
            Number(window.width),
            Number(window.height),
            blindTypes[type].basePrice
          );
          totalCost += price * window.quantity;
        }
      }
      estimates[type] = {
        low: Math.round(totalCost * 0.9),
        high: Math.round(totalCost * 1.1)
      };
    }
    return estimates;
  };

  const getPaintingEstimates = () => {
    let totalSqFt = 0;
    let roomBreakdown = [];

    paintingAreas.forEach((area) => {
      if (area.length && area.height && area.walls) {
        const areaSqFt = Number(area.length) * Number(area.height) * Number(area.walls);
        totalSqFt += areaSqFt;
        
        if (area.roomName) {
          roomBreakdown.push({
            name: area.roomName,
            sqft: areaSqFt,
            walls: Number(area.walls)
          });
        }
      }
    });

    let estimates = {};
    for (const type in paintTypes) {
      const totalCost = totalSqFt * paintTypes[type].pricePerSqFt;
      estimates[type] = {
        sqft: totalSqFt,
        cost: totalCost,
        rooms: roomBreakdown
      };
    }
    
    return estimates;
  };

  const getFlooringEstimates = () => {
    let totalSqFt = 0;
    let roomBreakdown = [];

    flooringAreas.forEach((area) => {
      if (area.length && area.width) {
        const areaSqFt = Number(area.length) * Number(area.width);
        totalSqFt += areaSqFt;
        
        if (area.roomName) {
          roomBreakdown.push({
            name: area.roomName,
            sqft: areaSqFt
          });
        }
      }
    });

    let estimates = {};
    for (const type in flooringTypes) {
      const totalCost = totalSqFt * flooringTypes[type].pricePerSqFt;
      estimates[type] = {
        sqft: totalSqFt,
        cost: totalCost,
        rooms: roomBreakdown
      };
    }
    
    return estimates;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Home Renovation Cost Calculator</h2>
      
      {/* Tab navigation */}
      <div className="border-b mb-6">
        <div className="flex -mb-px">
          <button
            className={`mr-1 py-2 px-4 font-medium ${
              activeTab === 'windows'
                ? 'border-l border-t border-r rounded-t text-blue-700 border-b-white'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('windows')}
          >
            Window Treatments
          </button>
          <button
            className={`mr-1 py-2 px-4 font-medium ${
              activeTab === 'painting'
                ? 'border-l border-t border-r rounded-t text-blue-700 border-b-white'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('painting')}
          >
            Painting
          </button>
          <button
            className={`mr-1 py-2 px-4 font-medium ${
              activeTab === 'flooring'
                ? 'border-l border-t border-r rounded-t text-blue-700 border-b-white'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('flooring')}
          >
            Flooring
          </button>
        </div>
      </div>
      
      {/* Window Treatment Section */}
      {activeTab === 'windows' && (
        <div>
          {windows.map((window, index) => (
            <div key={index} className="mb-6 p-4 bg-gray-50 rounded">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Window {index + 1}</h3>
                <button
                  onClick={() => removeWindow(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Minus className="w-5 h-5" />
                </button>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm mb-1">Room Name</label>
                <input
                  type="text"
                  value={window.roomName}
                  onChange={(e) => updateWindow(index, 'roomName', e.target.value)}
                  placeholder="e.g., Living Room, Kitchen"
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm mb-1">Width (inches)</label>
                  <input
                    type="number"
                    value={window.width}
                    onChange={(e) => updateWindow(index, 'width', e.target.value)}
                    className="w-full p-2 border rounded"
                    min="1"
                    max="192"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Height (inches)</label>
                  <input
                    type="number"
                    value={window.height}
                    onChange={(e) => updateWindow(index, 'height', e.target.value)}
                    className="w-full p-2 border rounded"
                    min="1"
                    max="192"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Quantity</label>
                  <input
                    type="number"
                    value={window.quantity}
                    onChange={(e) => updateWindow(index, 'quantity', e.target.value)}
                    className="w-full p-2 border rounded"
                    min="1"
                    max="99"
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={addWindow}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" /> Add Window
          </button>
        </div>
      )}
      
      {/* Painting Section */}
      {activeTab === 'painting' && (
        <div>
          {paintingAreas.map((area, index) => (
            <div key={index} className="mb-6 p-4 bg-gray-50 rounded">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Wall Area {index + 1}</h3>
                <button
                  onClick={() => removePaintingArea(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Minus className="w-5 h-5" />
                </button>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm mb-1">Room Name</label>
                <input
                  type="text"
                  value={area.roomName}
                  onChange={(e) => updatePaintingArea(index, 'roomName', e.target.value)}
                  placeholder="e.g., Living Room, Kitchen"
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm mb-1">Wall Length (feet)</label>
                  <input
                    type="number"
                    value={area.length}
                    onChange={(e) => updatePaintingArea(index, 'length', e.target.value)}
                    className="w-full p-2 border rounded"
                    min="1"
                    max="100"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Wall Height (feet)</label>
                  <input
                    type="number"
                    value={area.height}
                    onChange={(e) => updatePaintingArea(index, 'height', e.target.value)}
                    className="w-full p-2 border rounded"
                    min="1"
                    max="20"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Number of Walls</label>
                  <input
                    type="number"
                    value={area.walls}
                    onChange={(e) => updatePaintingArea(index, 'walls', e.target.value)}
                    className="w-full p-2 border rounded"
                    min="1"
                    max="20"
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={addPaintingArea}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" /> Add Wall Area
          </button>
        </div>
      )}
      
      {/* Flooring Section */}
      {activeTab === 'flooring' && (
        <div>
          {flooringAreas.map((area, index) => (
            <div key={index} className="mb-6 p-4 bg-gray-50 rounded">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Room {index + 1}</h3>
                <button
                  onClick={() => removeFlooringArea(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Minus className="w-5 h-5" />
                </button>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm mb-1">Room Name</label>
                <input
                  type="text"
                  value={area.roomName}
                  onChange={(e) => updateFlooringArea(index, 'roomName', e.target.value)}
                  placeholder="e.g., Living Room, Kitchen"
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">Room Length (feet)</label>
                  <input
                    type="number"
                    value={area.length}
                    onChange={(e) => updateFlooringArea(index, 'length', e.target.value)}
                    className="w-full p-2 border rounded"
                    min="1"
                    max="100"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Room Width (feet)</label>
                  <input
                    type="number"
                    value={area.width}
                    onChange={(e) => updateFlooringArea(index, 'width', e.target.value)}
                    className="w-full p-2 border rounded"
                    min="1"
                    max="100"
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={addFlooringArea}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" /> Add Room
          </button>
        </div>
      )}
      
      {/* Calculate button - displayed for all tabs */}
      <div className="mt-6">
        <button
          onClick={() => setShowEstimate(true)}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          <Calculator className="w-4 h-4" /> Calculate Full Estimate
        </button>
      </div>

      {/* Results section */}
      {showEstimate && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Renovation Estimate Summary</h3>
          
          {/* Window Treatment Estimates */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-3 flex items-center">
              <span className="mr-2">Window Treatments</span>
            </h4>
            <div className="grid gap-4">
              {Object.entries(getWindowEstimates()).map(([type, estimate]) => (
                <div key={type} className="p-4 bg-gray-50 rounded">
                  <div className="flex justify-between items-center">
                    <h5 className="font-semibold">{blindTypes[type].name}</h5>
                    <p className="text-lg">
                      ${estimate.low.toLocaleString()} - ${estimate.high.toLocaleString()}
                    </p>
                  </div>
                  {windows.map((window, index) => (
                    window.roomName && (
                      <div key={index} className="text-sm text-gray-600 mt-2">
                        {window.roomName}: {window.quantity} {window.quantity > 1 ? 'windows' : 'window'}
                      </div>
                    )
                  ))}
                </div>
              ))}
            </div>
          </div>
          
          {/* Painting Estimates */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-3 flex items-center">
              <Paintbrush className="w-5 h-5 mr-2" /> Painting
            </h4>
            <div className="grid gap-4">
              {Object.entries(getPaintingEstimates()).map(([type, estimate]) => (
                <div key={type} className="p-4 bg-gray-50 rounded">
                  <div className="flex justify-between items-center">
                    <h5 className="font-semibold">{paintTypes[type].name}</h5>
                    <p className="text-lg">
                      ${estimate.cost.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                    </p>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Total area: {estimate.sqft.toLocaleString()} sq. ft.
                  </div>
                  {estimate.rooms.map((room, index) => (
                    <div key={index} className="text-sm text-gray-600 mt-1">
                      {room.name}: {room.sqft.toLocaleString()} sq. ft. ({room.walls} walls)
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          
          {/* Flooring Estimates */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold mb-3 flex items-center">
              <Layout className="w-5 h-5 mr-2" /> Flooring
            </h4>
            <div className="grid gap-4">
              {Object.entries(getFlooringEstimates()).map(([type, estimate]) => (
                <div key={type} className="p-4 bg-gray-50 rounded">
                  <div className="flex justify-between items-center">
                    <h5 className="font-semibold">{flooringTypes[type].name}</h5>
                    <p className="text-lg">
                      ${estimate.cost.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                    </p>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    Total area: {estimate.sqft.toLocaleString()} sq. ft.
                  </div>
                  {estimate.rooms.map((room, index) => (
                    <div key={index} className="text-sm text-gray-600 mt-1">
                      {room.name}: {room.sqft.toLocaleString()} sq. ft.
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          
          {/* Total Estimate */}
          <div className="p-4 bg-blue-50 rounded border border-blue-200 mt-6">
            <h4 className="text-lg font-bold mb-2">Complete Project Estimate</h4>
            
            {(() => {
              const windowEstimate = getWindowEstimates().faux_cordless;
              const paintEstimate = getPaintingEstimates().standard;
              const floorEstimate = getFlooringEstimates().laminate;
              
              const lowTotal = windowEstimate.low + paintEstimate.cost + floorEstimate.cost;
              const highTotal = windowEstimate.high + paintEstimate.cost + floorEstimate.cost;
              
              return (
                <div>
                  <div className="flex justify-between items-center text-lg font-medium">
                    <span>Estimated Total:</span>
                    <span>${lowTotal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})} - ${highTotal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    * Based on Faux Cordless Blinds, Standard Paint, and Laminate flooring options. Prices include materials and standard installation.
                  </p>
                </div>
              );
            })()}
          </div>
          
          <div className="mt-6 p-4 bg-yellow-50 rounded border border-yellow-200">
            <h4 className="font-semibold mb-2">Ready to Start Your Project?</h4>
            <p className="text-sm mb-4">Contact our partner programs for professional service and exclusive discounts:</p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-3 bg-white rounded shadow-sm">
                <h5 className="font-medium mb-1">Blinds Today</h5>
                <p className="text-sm text-gray-600">Premium window treatments with professional installation</p>
              </div>
              <div className="p-3 bg-white rounded shadow-sm">
                <h5 className="font-medium mb-1">Paint in the Shade</h5>
                <p className="text-sm text-gray-600">Expert painting with complimentary temporary window coverings</p>
              </div>
              <div className="p-3 bg-white rounded shadow-sm">
                <h5 className="font-medium mb-1">Floors in Focus</h5>
                <p className="text-sm text-gray-600">Quality flooring installation with coordinated window treatments</p>
              </div>
            </div>
          </div>
          
        </div>
      )}
    </div>
  );
};

export default HomeRenovationCalculator;
