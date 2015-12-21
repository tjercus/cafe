/// <reference path="app.ts" />

module CafeApp {

	/**
	 * Web Worker that handles the taking of an order from a customer to the Chef
	 *
	 * User clicks on one of three buttons to order
	 * GUI(App) notifies Waiter
	 * Waiter waits for 1 to 5 seconds
	 * Waiter notifies App the order can be queued
	 */
	class Waiter<Worker> {

		constructor() {
			// event.data {'messageName': 'deliverOrderCommand', 'payload' : {order:Order}};
			onmessage = (event) => {
				var orderProcessingTime = Math.floor(Math.random() * 5);
				console.log("Waiter: received event from Cafe: " + JSON.stringify(event.data.messageName));
				setTimeout("postMessage({'messageName': 'addOrderToQueueCommand', 'payload': '" + event.data.payload + "'})", orderProcessingTime * 1000);
			}
		}
	}

	// create an instance so this worker actually runs
	new Waiter();
}
