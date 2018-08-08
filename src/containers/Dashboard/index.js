import React from 'react';
import './chartWrapper.css'
import TrucksPerHourChart from '../../components/TrucksPerHourChart';
import TruckTimeInFacilityChart from '../../components/TruckTimeInFacilityChart';
import ResizingSection from '../../components/ResizingSection';


export default class ChartWrapper extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      sectionsArray : [
        {
          Title: `Avg Minutes in Facility`,
          value : 47,
          colSize:3,
          height: '80px'
        },
        {
          Title: `Avg Trucks per Hour`,
          value : 12,
          colSize:3,
          height: '80px'
        },
        {
          Title: `Trucks In Transit`,
          value : 8,
          colSize:3,
          height: '80px'
        },
        {
          Title: `Alert`,
          value : false,
          colSize:3,
          height: '80px'
        },
        {
          Title: `Facility Time Per Truck`,
          value : <TruckTimeInFacilityChart />,
          colSize:12,
          height: '80px'
        },
        {
          Title: `Trucks Per Hour`,
          value : <TrucksPerHourChart />,
          colSize:12,
          height: '80px'
        }
      ]
    }
  }

  render(){

    //converts the above sectionsArray into a 'sections' var for returning    
    const sections = this.state.sectionsArray.map((sec,ind) => {
      sec.calcHeight = this.state.sectionHeight;
      sec.canLoadHeight = this.state.canLoadHeight;
      return <ResizingSection key={ind} {...sec}  />;
    })

    return (
      <main role="main" className="doashboardMain">
        <div className="headerSpacer" />
        <div className="row">
          {sections[0]}{sections[1]}{sections[2]}{sections[3]}
        </div>

        <div className="row">
         {sections[4]}
        </div>

        <div className="row">
          {sections[5]}
        </div>

      </main>
    );
  
  }
}