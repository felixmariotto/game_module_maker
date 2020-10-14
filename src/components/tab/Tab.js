
import './tab.css';

//

export default function Tab() {

	// TAB TAG
	// this is actually the positioned element in the layout.
	// the tab content is a child element with position fixed

	const container = document.createElement('DIV');
	container.classList.add('tab');

	// TAB CONTENT

	const content = document.createElement('DIV');
	content.classList.add('tab-content');

	container.append( content );

	//

	container.setName = function( text ) {

		container.append( text );

	};

	//

	return container

}
