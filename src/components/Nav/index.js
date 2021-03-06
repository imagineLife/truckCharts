import React from 'react';
import './Nav.css';
import NavLink from '../NavLink';
import settingsImg from '../../imgs/settings.png'
import chartsImg from '../../imgs/charts.png'
import dashboardImg from '../../imgs/dash.ico'

export default function Nav() {
//array of Objects,
//these are properties of each NavLink below	
	const navLinkArray = [
		{
			linkTo : "/settings",
			imgSrc : settingsImg,
			alt : "Settings"
		},
		{
			linkTo : "/charts",
			imgSrc : chartsImg,
			alt : "ChartsDemo"
		},
		{
			linkTo : "/dashboard",
			imgSrc : dashboardImg,
			alt : "Dashboard"
		}
	];

//convert the array objects above into <NavLink />s
	const linkObjsToComponents = navLinkArray.map((navLink,ind) => {
		return <NavLink key={ind} linkTo={navLink.linkTo}  imgSrc={navLink.imgSrc}  linkTitle={navLink.alt}/>;
	})
	
    return (
		<nav>
			<ul>
				{linkObjsToComponents}
			</ul>
		</nav> 
    );
}
