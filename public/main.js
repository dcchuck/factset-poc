/*
https://ondemand.factset.com/views/guide/full-quote-mf/?ticker=FDS-US
https://ondemand.factset.com/views/guide/full-quote-index/?ticker=FDS-US
https://ondemand.factset.com/views/guide/full-quote-etf/?ticker=FDS-US
*/

const fdc3Contexts = [
	{
		object: 'fdc3-context',
		definition: 'https://github.com/FDC3/ContextData/blob/master/Specification-Draft.MD',
		version: '0.0.1',
		data: [
			{
				type: 'security',
				name: 'Apple',
				id: {
					ticker: 'aapl',
					ISIN: 'US0378331005',
					CUSIP: '037833100',
					FIGI: 'BBG000B9XRY4',
					default: 'aapl'
				}
			}
		]
	},
	{
		object: 'fdc3-context',
		definition: 'https://github.com/FDC3/ContextData/blob/master/Specification-Draft.MD',
		version: '0.0.1',
		data: [
			{
				type: 'security',
				name: 'IBM',
				id: {
					ticker: 'ibm',
					ISIN: 'US4592001014',
					default: 'ibm'
				}
			}
		]
	},
	{
		object: 'fdc3-context',
		definition: 'https://github.com/FDC3/ContextData/blob/master/Specification-Draft.MD',
		version: '0.0.1',
		data: [
			{
				type: 'security',
				name: 'ADT',
				id: {
					ticker: 'adt',
					default: 'adt'
				}
			}
		]
	},
	{
		object: 'fdc3-context',
		definition: 'https://github.com/FDC3/ContextData/blob/master/Specification-Draft.MD',
		version: '0.0.1',
		data: [
			{
				type: 'security',
				name: 'Aflac',
				id: {
					ticker: 'afl',
					default: 'afl'
				}
			}
		]
	},
	{
		object: 'fdc3-context',
		definition: 'https://github.com/FDC3/ContextData/blob/master/Specification-Draft.MD',
		version: '0.0.1',
		data: [
			{
				type: 'security',
				name: 'Metlife',
				id: {
					ticker: 'met',
					default: 'met'
				}
			}
		]
	},
	{
		object: 'fdc3-context',
		definition: 'https://github.com/FDC3/ContextData/blob/master/Specification-Draft.MD',
		version: '0.0.1',
		data: [
			{
				type: 'security',
				name: '3M',
				id: {
					ticker: 'mmm',
					default: 'mmm'
				}
			}
		]
	},
	{
		object: 'fdc3-context',
		definition: 'https://github.com/FDC3/ContextData/blob/master/Specification-Draft.MD',
		version: '0.0.1',
		data: [
			{
				type: 'security',
				name: 'Smart',
				id: {
					ticker: 'sfs',
					ISIN: 'US4592001014',
					default: 'sfs'
				}
			}
		]
	},
	{
		object: 'fdc3-context',
		definition: 'https://github.com/FDC3/ContextData/blob/master/Specification-Draft.MD',
		version: '0.0.1',
		data: [
			{
				type: 'security',
				name: 'Shopify',
				id: {
					ticker: 'shop',
					default: 'shop'
				}
			}
		]
	},
	{
		object: 'fdc3-context',
		definition: 'https://github.com/FDC3/ContextData/blob/master/Specification-Draft.MD',
		version: '0.0.1',
		data: [
			{
				type: 'security',
				name: 'Goldman Sachs',
				id: {
					ticker: 'gmz',
					ISIN: 'US4592001014',
					default: 'gmz'
				}
			}
		]
	},
	{
		object: 'fdc3-context',
		definition: 'https://github.com/FDC3/ContextData/blob/master/Specification-Draft.MD',
		version: '0.0.1',
		data: [
			{
				type: 'security',
				name: 'Gap Inc',
				id: {
					ticker: 'gps',
					ISIN: 'US4592001014',
					default: 'gps'
				}
			}
		]
	}
]

const stubbedAppDirectory = {
	YahooFinance: {
		uuid: 'yahoo-finance-demo',
		name: 'YahooFinance',
		configObject: {
			name: 'YahooFinance',
			url: 'https://finance.yahoo.com',
			uuid: 'yahoo-finance-demo',
			mainWindowOptions: {
				autoShow: true,
				preload: 'http://localhost:8080/yahoo-finance/preload.js'
			}
		}
	},
	FactSet: {
		uuid: 'factset-demo',
		name: 'FactSet',
		configObject: {
			name: 'FatSet',
			url: 'http://localhost:8080/factset',
            uuid: 'factset-demo',
            mainWindowOptions: {
                autoShow: true
            }
		}
    }
}

function launchOpenFinApp(config) {
    config.uuid = `${config.uuid}-${Math.random().toString()}`;
    const newApp = new fin.desktop.Application(config, () => newApp.run(), (e) => console.log(`Error launching app: ${e}`));
}

const launchFactSetButton = document.getElementById('launch-factset');
const launchYahooButton = document.getElementById('launch-yahoo');

launchFactSetButton.onclick = () => {
    const formType = document.querySelector('input[name="form-type"]:checked').value;
    const config = stubbedAppDirectory.FactSet.configObject;
    config.mainWindowOptions.customData = formType;
    console.log(config)
    launchOpenFinApp(stubbedAppDirectory.FactSet.configObject);
}

launchYahooButton.onclick = () => {
    launchOpenFinApp(stubbedAppDirectory.YahooFinance.configObject);
}

function populateContextOptions () {
    const selectParent = document.getElementById('contexts-select');
    fdc3Contexts.forEach(context => {
        const option = document.createElement('option');
        // Simplifying this for demo purposes
        option.text = context.data[0].name;
        selectParent.add(option);
    });
}

populateContextOptions();

function getTickerFromName(name) {
    const filteredList = fdc3Contexts.filter(el => el.data[0].name === name);
    return filteredList[0];
}

function publishContext() {
    const currentTickerName = document.getElementById('contexts-select').value;
    const fdc3ContextObject = getTickerFromName(currentTickerName);
    fin.desktop.InterApplicationBus.publish('fdc3', { intent: 'ViewChart', context: fdc3ContextObject },
        () => console.log(`Successfuly published: ${currentTickerName}`),
        (e) => console.log(`Error publishing: ${e}`)
    );
}

const publishContextButton = document.getElementById('publish-context');

publishContextButton.onclick = () => { publishContext() };