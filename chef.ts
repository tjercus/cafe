/// <reference path="app.ts" />

module CafeApp {

	/**
	 * Web Worker that handles the taking of an order from a queue and cooking it
	 */
	class Chef<Worker> {

		ASK_FOR_WORK_INTERVAL_MS: number = 5000;

		constructor() {
			onmessage = (event) => {
				var cookingTime = Math.floor(Math.random() * 11);
				console.log("Chef: received event from Cafe: " + JSON.stringify(event.data.payload));
				switch(event.data['messageName']) {
					case 'cookCommand':
						setTimeout("postMessage({'messageName': 'orderCookedEvent', 'payload': '" + JSON.stringify(event.data.payload) + "'})", cookingTime * 1000);
						break;
				}
			}

			this.askForWorkCommand();
		}

		askForWorkCommand = () => {
			setInterval("postMessage({'messageName': 'askForWorkCommand', 'payload': {}})", this.ASK_FOR_WORK_INTERVAL_MS);
		}
	}

	// create an instance so this worker actually runs
	new Chef();
}