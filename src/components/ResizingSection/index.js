import React from 'react';
import './ResizingSection.css';

export default function ResizingSection(props) {
	
	let content;
	//IF the content is a number, show it in a span
	if (typeof props.value === 'number'){
		let thisVal = props.value;
		if(props.value < 10){

		}
		content = <span className="numberContent">{props.value}</span>
	}

	//IF content is a component (object) return the component
	if (typeof props.value === 'object'){
		let thisVal = props.value;
		if(props.value < 10){

		}
		content = thisVal;
	}

	return (
		<section className={"col-"+props.colSize+" resizingSection"}>

			<h2 className="sectionHeader">{props.Title}</h2>
			
			{content}

	    </section>
	);
}
