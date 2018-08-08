import React from 'react';
import './ResizingSection.css';

export default function ResizingSection(props) {
	console.log('resizing section props')
	console.log(props)
	
	return (
		<section className={"col-"+props.colSize}>
			<p>Demo Text in a section</p>
	    </section>
	);
}
