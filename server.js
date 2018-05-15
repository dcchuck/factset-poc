const express = require('express');
const app = express();
const openfinLauncher = require('openfin-launcher');
const path = require('path');

app.use(express.static('public'));

const port = process.env.PORT || 8080;

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
	openfinLauncher.launchOpenFin( {configPath: path.join(__dirname, 'public', 'app.json')} )
		.then(() => process.exit());
});

