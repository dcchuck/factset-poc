const mainFrame = document.getElementById('main-frame');
let baseUrl;

const thisWindow = fin.desktop.Window.getCurrent();

thisWindow.getOptions(options => {
    baseUrl = `https://ondemand.factset.com/views/guide/full-quote-${options.customData}/?ticker=`
})

fin.desktop.InterApplicationBus.subscribe('controller-app', 'fdc3', (m,u,n) => { 
    console.log('Message Received')
    const ticker = m.context.data[0].id.ticker
    mainFrame.src = `${baseUrl}${ticker}`
}, () => {
    console.log('Successfully Subcribred');
});