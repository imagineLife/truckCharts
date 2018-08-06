import React from 'react'

import './App.css'
import TrucksPerHourChart from '../TrucksPerHourChart'
import TruckTimeInFacilityChart from '../TruckTimeInFacilityChart'

export default () =>
  <div className="App">
      <TrucksPerHourChart />
      <TruckTimeInFacilityChart />
  </div>
