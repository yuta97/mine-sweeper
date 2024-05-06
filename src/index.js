import React from "react";
import { createRoot } from 'react-dom/client';
import { Main } from "./main"
const App = () => {
	return (
		<Main />
	);
}
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App tab="home" />);