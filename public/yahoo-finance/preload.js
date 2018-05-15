document.addEventListener('DOMContentLoaded', () => {
	fin.desktop.main(() => {
		fin.desktop.InterApplicationBus.subscribe('controller-app', 'fdc3', (m,u,n) => { 
			console.log('Message Received')
			const ticker = m.context.data[0].id.ticker
			window.location.href = `https://finance.yahoo.com/quote/${ticker}`
		}, () => {
			console.log('Successfully Subcribred');
		});
	});
	console.log('Preload Loaded');
});