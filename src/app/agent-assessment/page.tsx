"use client";

import { useState } from 'react';
import { User, Target, Zap, Car, Home } from 'lucide-react';

interface AssessmentData {
  // Client Info (HubSpot)
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  website: string;
  industry: string;
  
  // Auto Insurance Data
  autoNeeded: boolean;
  vehicles: Array<{
    year: string;
    make: string;
    model: string;
    vin: string;
    ownership: string;
    primaryUse: string;
    annualMileage: string;
    safetyFeatures: string;
    modifications: string;
    garagedAddress: string;
    existingDamages: string;
  }>;
  drivers: Array<{
    name: string;
    dob: string;
    licenseNumber: string;
    drivingHistory: string;
    defensiveDriving: boolean;
    studentGrades: string;
  }>;
  autoLiabilityLimits: string;
  autoCompCollision: boolean;
  autoRoadside: boolean;
  autoGapCoverage: boolean;
  
  // Homeowners Insurance Data
  homeNeeded: boolean;
  propertyAddress: string;
  yearBuilt: string;
  squareFootage: string;
  constructionType: string;
  roofType: string;
  roofReplaced: string;
  propertyType: string;
  basement: string;
  detachedStructures: string;
  replacementCost: string;
  heatingCooling: string;
  safetySystemsHome: string;
  smartHome: string;
  systemUpdates: string;
  occupancyType: string;
  occupants: string;
  pets: string;
  homebusiness: string;
  homeDeductible: string;
  personalPropertyCoverage: string;
  floodEarthquake: boolean;
  priorClaims: string;
  
  // Assessment Details (PDF)
  currentChallenges: string;
  goals: string;
  budget: string;
  timeline: string;
  currentSolutions: string;
  painPoints: string;
  decisionProcess: string;
  additionalNotes: string;
  
  // Scoring (HubSpot)
  leadScore: number;
  urgency: string;
  fitScore: number;
}

export default function AgentAssessment() {
  const [formData, setFormData] = useState<AssessmentData>({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    website: '',
    industry: '',
    
    autoNeeded: false,
    vehicles: [{ year: '', make: '', model: '', vin: '', ownership: '', primaryUse: '', annualMileage: '', safetyFeatures: '', modifications: '', garagedAddress: '', existingDamages: '' }],
    drivers: [{ name: '', dob: '', licenseNumber: '', drivingHistory: '', defensiveDriving: false, studentGrades: '' }],
    autoLiabilityLimits: '',
    autoCompCollision: false,
    autoRoadside: false,
    autoGapCoverage: false,
    
    homeNeeded: false,
    propertyAddress: '',
    yearBuilt: '',
    squareFootage: '',
    constructionType: '',
    roofType: '',
    roofReplaced: '',
    propertyType: '',
    basement: '',
    detachedStructures: '',
    replacementCost: '',
    heatingCooling: '',
    safetySystemsHome: '',
    smartHome: '',
    systemUpdates: '',
    occupancyType: '',
    occupants: '',
    pets: '',
    homebusiness: '',
    homeDeductible: '',
    personalPropertyCoverage: '',
    floodEarthquake: false,
    priorClaims: '',
    
    currentChallenges: '',
    goals: '',
    budget: '',
    timeline: '',
    currentSolutions: '',
    painPoints: '',
    decisionProcess: '',
    additionalNotes: '',
    leadScore: 0,
    urgency: 'medium',
    fitScore: 0
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const hubspotData = {
        companyName: formData.companyName,
        contactName: formData.contactName,
        email: formData.email,
        phone: formData.phone,
        website: formData.website,
        industry: formData.industry,
        leadScore: formData.leadScore,
        urgency: formData.urgency,
        fitScore: formData.fitScore,
        autoNeeded: formData.autoNeeded,
        homeNeeded: formData.homeNeeded
      };

      await fetch('/api/hubspot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hubspotData)
      });

      const pdfResponse = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (pdfResponse.ok) {
        const blob = await pdfResponse.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `insurance-assessment-${formData.contactName.replace(/\s+/g, '-')}.pdf`;
        a.click();
      }

      alert('Assessment completed! Data sent to HubSpot and PDF downloaded.');
      
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting assessment. Please try again.');
    }
    
    setIsSubmitting(false);
  };

  const updateField = (field: keyof AssessmentData, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addVehicle = () => {
    setFormData(prev => ({
      ...prev,
      vehicles: [...prev.vehicles, { year: '', make: '', model: '', vin: '', ownership: '', primaryUse: '', annualMileage: '', safetyFeatures: '', modifications: '', garagedAddress: '', existingDamages: '' }]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Insurance Assessment</h1>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 5) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">Step {currentStep} of 5</p>
          </div>

          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="flex items-center mb-6">
                <User className="h-6 w-6 text-blue-600 mr-2" />
                <h2 className="text-xl font-semibold">Client Information</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    value={formData.contactName}
                    onChange={(e) => updateField('contactName', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => updateField('website', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Insurance Needs</h3>
                <div className="flex gap-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.autoNeeded}
                      onChange={(e) => updateField('autoNeeded', e.target.checked)}
                      className="mr-2"
                    />
                    Auto Insurance
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.homeNeeded}
                      onChange={(e) => updateField('homeNeeded', e.target.checked)}
                      className="mr-2"
                    />
                    Homeowners Insurance
                  </label>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && formData.autoNeeded && (
            <div className="space-y-6">
              <div className="flex items-center mb-6">
                <Car className="h-6 w-6 text-blue-600 mr-2" />
                <h2 className="text-xl font-semibold">Auto Insurance Assessment</h2>
              </div>

              <div className="border p-4 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">Vehicle Information</h3>
                  <button
                    type="button"
                    onClick={addVehicle}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Add Vehicle
                  </button>
                </div>

                {formData.vehicles.map((vehicle, index) => (
                  <div key={index} className="border-b pb-4 mb-4 last:border-b-0">
                    <h4 className="font-medium mb-3">Vehicle {index + 1}</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      <input
                        type="text"
                        placeholder="Year"
                        value={vehicle.year}
                        onChange={(e) => {
                          const newVehicles = [...formData.vehicles];
                          newVehicles[index].year = e.target.value;
                          setFormData(prev => ({ ...prev, vehicles: newVehicles }));
                        }}
                        className="p-3 border border-gray-300 rounded-md"
                      />
                      <input
                        type="text"
                        placeholder="Make"
                        value={vehicle.make}
                        onChange={(e) => {
                          const newVehicles = [...formData.vehicles];
                          newVehicles[index].make = e.target.value;
                          setFormData(prev => ({ ...prev, vehicles: newVehicles }));
                        }}
                        className="p-3 border border-gray-300 rounded-md"
                      />
                      <input
                        type="text"
                        placeholder="Model"
                        value={vehicle.model}
                        onChange={(e) => {
                          const newVehicles = [...formData.vehicles];
                          newVehicles[index].model = e.target.value;
                          setFormData(prev => ({ ...prev, vehicles: newVehicles }));
                        }}
                        className="p-3 border border-gray-300 rounded-md"
                      />
                      <input
                        type="text"
                        placeholder="VIN"
                        value={vehicle.vin}
                        onChange={(e) => {
                          const newVehicles = [...formData.vehicles];
                          newVehicles[index].vin = e.target.value;
                          setFormData(prev => ({ ...prev, vehicles: newVehicles }));
                        }}
                        className="p-3 border border-gray-300 rounded-md"
                      />
                      <select
                        value={vehicle.ownership}
                        onChange={(e) => {
                          const newVehicles = [...formData.vehicles];
                          newVehicles[index].ownership = e.target.value;
                          setFormData(prev => ({ ...prev, vehicles: newVehicles }));
                        }}
                        className="p-3 border border-gray-300 rounded-md"
                      >
                        <option value="">Ownership</option>
                        <option value="owned">Owned</option>
                        <option value="leased">Leased</option>
                        <option value="financed">Financed</option>
                      </select>
                      <select
                        value={vehicle.primaryUse}
                        onChange={(e) => {
                          const newVehicles = [...formData.vehicles];
                          newVehicles[index].primaryUse = e.target.value;
                          setFormData(prev => ({ ...prev, vehicles: newVehicles }));
                        }}
                        className="p-3 border border-gray-300 rounded-md"
                      >
                        <option value="">Primary Use</option>
                        <option value="commute">Commute</option>
                        <option value="business">Business</option>
                        <option value="pleasure">Pleasure</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Coverage Preferences</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Liability Limits
                    </label>
                    <select
                      value={formData.autoLiabilityLimits}
                      onChange={(e) => updateField('autoLiabilityLimits', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md"
                    >
                      <option value="">Select Limits</option>
                      <option value="25/50/25">25/50/25</option>
                      <option value="50/100/50">50/100/50</option>
                      <option value="100/300/100">100/300/100</option>
                      <option value="250/500/100">250/500/100</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.autoCompCollision}
                        onChange={(e) => updateField('autoCompCollision', e.target.checked)}
                        className="mr-2"
                      />
                      Comprehensive & Collision
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.autoRoadside}
                        onChange={(e) => updateField('autoRoadside', e.target.checked)}
                        className="mr-2"
                      />
                      Roadside Assistance
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && formData.homeNeeded && (
            <div className="space-y-6">
              <div className="flex items-center mb-6">
                <Home className="h-6 w-6 text-blue-600 mr-2" />
                <h2 className="text-xl font-semibold">Homeowners Insurance Assessment</h2>
              </div>

              <div className="border p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Property Details</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property Address *
                    </label>
                    <input
                      type="text"
                      value={formData.propertyAddress}
                      onChange={(e) => updateField('propertyAddress', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Year Built"
                    value={formData.yearBuilt}
                    onChange={(e) => updateField('yearBuilt', e.target.value)}
                    className="p-3 border border-gray-300 rounded-md"
                  />
                  <input
                    type="text"
                    placeholder="Square Footage"
                    value={formData.squareFootage}
                    onChange={(e) => updateField('squareFootage', e.target.value)}
                    className="p-3 border border-gray-300 rounded-md"
                  />
                  <select
                    value={formData.constructionType}
                    onChange={(e) => updateField('constructionType', e.target.value)}
                    className="p-3 border border-gray-300 rounded-md"
                  >
                    <option value="">Construction Type</option>
                    <option value="frame">Frame</option>
                    <option value="masonry">Masonry</option>
                    <option value="brick">Brick</option>
                    <option value="stucco">Stucco</option>
                  </select>
                  <select
                    value={formData.propertyType}
                    onChange={(e) => updateField('propertyType', e.target.value)}
                    className="p-3 border border-gray-300 rounded-md"
                  >
                    <option value="">Property Type</option>
                    <option value="single-family">Single Family</option>
                    <option value="condo">Condo</option>
                    <option value="townhouse">Townhouse</option>
                    <option value="multi-family">Multi-Family</option>
                  </select>
                </div>
              </div>

              <div className="border p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-4">Coverage Preferences</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <select
                    value={formData.homeDeductible}
                    onChange={(e) => updateField('homeDeductible', e.target.value)}
                    className="p-3 border border-gray-300 rounded-md"
                  >
                    <option value="">Preferred Deductible</option>
                    <option value="500">$500</option>
                    <option value="1000">$1,000</option>
                    <option value="2500">$2,500</option>
                    <option value="5000">$5,000</option>
                  </select>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.floodEarthquake}
                      onChange={(e) => updateField('floodEarthquake', e.target.checked)}
                      className="mr-2"
                    />
                    Flood or Earthquake Coverage Needed
                  </label>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="flex items-center mb-6">
                <Target className="h-6 w-6 text-blue-600 mr-2" />
                <h2 className="text-xl font-semibold">General Assessment</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Challenges
                  </label>
                  <textarea
                    value={formData.currentChallenges}
                    onChange={(e) => updateField('currentChallenges', e.target.value)}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="What insurance challenges are they facing?"
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Budget Range
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => updateField('budget', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Budget</option>
                      <option value="under-200">Under $200/month</option>
                      <option value="200-500">$200-500/month</option>
                      <option value="500-1000">$500-1000/month</option>
                      <option value="1000-plus">$1000+/month</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Timeline
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => updateField('timeline', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Timeline</option>
                      <option value="immediate">Immediate</option>
                      <option value="30-days">Within 30 days</option>
                      <option value="60-days">Within 60 days</option>
                      <option value="renewal">At renewal</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="flex items-center mb-6">
                <Zap className="h-6 w-6 text-blue-600 mr-2" />
                <h2 className="text-xl font-semibold">Agent Scoring & Notes</h2>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lead Score (1-10)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={formData.leadScore}
                    onChange={(e) => updateField('leadScore', parseInt(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Urgency Level
                  </label>
                  <select
                    value={formData.urgency}
                    onChange={(e) => updateField('urgency', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fit Score (1-10)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={formData.fitScore}
                    onChange={(e) => updateField('fitScore', parseInt(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Agent Notes & Recommendations
                </label>
                <textarea
                  value={formData.additionalNotes}
                  onChange={(e) => updateField('additionalNotes', e.target.value)}
                  rows={6}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Agent observations, recommendations, next steps..."
                />
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {currentStep < 5 ? (
              <button
                onClick={() => {
                  if (currentStep === 2 && !formData.autoNeeded) {
                    setCurrentStep(3);
                  } else if (currentStep === 3 && !formData.homeNeeded) {
                    setCurrentStep(4);
                  } else {
                    setCurrentStep(currentStep + 1);
                  }
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Complete Assessment'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}