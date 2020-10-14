
import './modulableAreas.css';

//

/*
the argument of this function is an array containing an
arbitrary number of numbers which must sum to 100. These
number will be used to determine the number and size of 
resizable sections.
*/
export default function ModulableAreas( resizeDirection, percentsArray ) {

	// check if sum == 100
	if ( percentsArray.reduce( ( accu, val ) => accu + val, 0 ) !== 100 ) {
		console.error('wrong params given to ModulableAreas')
	}

	// check if array is big enough to build this component
	if ( percentsArray.length === 0 || percentsArray.length === 1 ) {
		console.error('not enough values given to ModulableAreas')
	}

	// CONTAINER

	const container = document.createElement('DIV');
	container.classList.add('modulable-area');

	if ( resizeDirection === 'x' ) container.style.flexDirection = 'row';
	else container.style.flexDirection = 'column';

	// SECTIONS

	const sections = [];

	percentsArray.forEach( ( sectionSize, idx, arr ) => {

		const section = Section( resizeDirection );

		sections.push( section );

		container.append( section );

		// optionaly add a separation line

		if ( idx < arr.length - 1 ) {

			const separationLine = SeparationLine( resizeDirection );

			container.append( separationLine );

		}

	})

	//

	resizeSections();

	function resizeSections() {

		sections.forEach( ( section, idx )=> {

			section.resize( percentsArray[ idx ] )

		})

	}

	//

	return {
		container,
		sections
	}

}

// SECTION

function Section( resizeDirection ) {

	const section = document.createElement('DIV');
	section.classList.add( 'resizable-area-section' );

	section.resize = function( percent ) {

		if ( resizeDirection === "x" ) {

			section.style.width = percent + "%";

		} else {



			section.style.height = percent + "%";

		}

	}

	return section

}

// SEPARATION LINES

function SeparationLine( resizeDirection ) {

	const line = document.createElement('DIV');
	line.classList.add(
		'modulable-area-separation-line',
		resizeDirection === "x" ? 'vertical' : 'horizontal'
	);

	return line
	
}
