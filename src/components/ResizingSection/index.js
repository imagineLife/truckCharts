import React from 'react';
import './ResizingSection.css';

export default function ResizingSection(props) {
	console.log('resizing section props TYPE')
	console.log(typeof props.value)
	
	let content;
	if (typeof props.value === 'number'){
		content = <h2 className="numberContent">{props.value}</h2>
	}

	return (
		<section className={"col-"+props.colSize+" resizingSection"}>

			<h2 className="sectionHeader">{props.Title}</h2>
			
			{content}

	    </section>
	);
}
