import {useEffect, useState} from 'react';
import Presentation from '../types/Presentation'

const usePresentation = (parentWindow: (Window & typeof globalThis) | null | undefined) => {
	const checkPresentation = (): Presentation => {
		let newPresentation: Presentation = Presentation.DESKTOP;
		if (parentWindow != null) {
			const width = parentWindow.innerWidth;
			if (width < 768) {
				newPresentation = Presentation.PHONE;
			} else if (width < 1200) {
				newPresentation = Presentation.TABLET;
			}
		}
		return newPresentation;
	};

	const [presentation, setPresentation] = useState<Presentation>(checkPresentation());
	const updatePresentation = () => {
		const newPresentation = checkPresentation();
		if (newPresentation !== presentation) {
			setPresentation(newPresentation);
		}
	};

	useEffect(() => {
		parentWindow?.addEventListener('resize', updatePresentation);
		return () => parentWindow?.removeEventListener('resize', updatePresentation);
	});

	return presentation;
};

export default usePresentation