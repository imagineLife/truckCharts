import React from 'react';
import './Nav.css';
import NavLink from '../NavLink';
import settingsImg from '../../imgs/settings.png'
import chartsImg from '../../imgs/charts.png'

export default function Nav() {
	//Help update this specific navLink text to change when signed-in-or-not :) 

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
			alt : "Charts"
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
