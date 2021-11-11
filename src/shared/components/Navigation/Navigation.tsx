import React from "react";
import AppDrawer from "./Drawer";
import NavigationBar from "./NavigationBar";


export default function Navigation() {
	const [open, setOpen] = React.useState(false);

	const toggleDrawer = React.useCallback((
		event: React.KeyboardEvent | React.MouseEvent,
		shouldWork: boolean = true
	) => {
		event.stopPropagation();
		if (
			shouldWork &&
			event.type === 'keydown' &&
			((event as React.KeyboardEvent).key === 'Tab' ||
				(event as React.KeyboardEvent).key === 'Shift')
		) {
			return;
		}
		setOpen(old => !old);
	}, []);

	return <>
		<NavigationBar toggleDrawer={toggleDrawer} />
		<AppDrawer
			open={open}
			toggleOpen={toggleDrawer}
		/>
	</>
}