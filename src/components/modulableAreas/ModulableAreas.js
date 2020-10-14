
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

	percentsArray.forEach( ( sectionSize, thisSectionIdx, arr ) => {

		const section = Section( resizeDirection );

		sections.push( section );

		container.append( section );

		// optionaly add a separation line

		if ( thisSectionIdx < arr.length - 1 ) {

			const separationLine = SeparationLine( resizeDirection );

			container.append( separationLine );

			let isGrabbing, newPosition;

			separationLine.addEventListener( 'mousedown', (e) => {

				isGrabbing = true;

			})

			window.addEventListener( 'mousemove', (e) => {

				if ( isGrabbing !== undefined ) {

					const rect = container.getBoundingClientRect();
					const clientX = e.clientX - rect.left; //x position within the element.
					const clientY = e.clientY - rect.top;  //y position within the element.

					newPosition = resizeDirection === "x" ? clientX : clientY;

					const percentPos = resizeDirection === "x" ?
						( newPosition / rect.width ) * 100 :
						( newPosition / rect.height ) * 100 ;

					// recompute size of each section

					percentsArray = percentsArray.map( (sectionSize, sectionToUpdateIdx) => {

						if (
							sectionToUpdateIdx !== thisSectionIdx &&
							sectionToUpdateIdx !== thisSectionIdx + 1
						) {

							return sectionSize

						} else if ( sectionToUpdateIdx == thisSectionIdx ) {

							return Math.max(
								0,
								Math.min(
									95,
									percentPos - percentsArray.reduce( (accu, val, j) => j < sectionToUpdateIdx ? accu + val : accu, 0 )
								)
							)

						} else if ( sectionToUpdateIdx == thisSectionIdx + 1 ) {

							return Math.max(
								0,
								Math.min(
									100,
									100 - ( percentPos + percentsArray.reduce( (accu, val, j) => j > sectionToUpdateIdx ? accu + val : accu, 0 ) )
								)
							)

						}

					})

					// resize dom

					resizeSections();

				}

			})

			window.addEventListener( 'mouseup', (e) => {

				isGrabbing = undefined

			})

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
