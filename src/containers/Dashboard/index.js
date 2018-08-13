import React from 'react';
import './chartWrapper.css'
import TrucksPerHourChart from '../../components/TrucksPerHourChart';
import TruckTimeInFacilityChart from '../../components/TruckTimeInFacilityChart';
import ResizingSection from '../../components/ResizingSection';
import Alert from '../../components/Alert';
import { connect } from 'react-redux';


export class Dashboard extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      sectionsArray : [
        {
          Title: `Current Time in Facility`,
          value : 37,
          colSize:3,
          height: '80px'
        },
        {
          Title: `Avg Trucks per Hour`,
          value : 15,
          colSize:3,
          height: '80px'
        },
        {
          Title: `Trucks at the Elevator`,
          value : 6,
          colSize:3,
          height: '80px'
        },
        {
          // Title: `Alert`,
          value : <Alert />,
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
      <main role="main" className="dashboardMain">
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

        <div className="footerSpacer"></div>


      </main>
    );
  
  }
}

const mapStateToProps = state => ({storeAlerts: state})

export default connect(mapStateToProps)(Dashboard);