const presence = new Presence({
  clientId: "1006006215903551588"
});

const data = {
	isLoggedIn: false,
	availableGuilds: 0,
	activeGuild: {
		element: document.querySelector("div[class*='guildNavLink_guildInfoWrapr--active']") as Element,
		name: "" as string,
	},
	queue: {
		element: document.querySelector("div[class*='musicPlayerQueue_muscPlyrQue__2aXgA']") as Element,
		count: NaN as number,
	},
	player: {
		songName: "" as string,
		isPlaying: false as boolean,
		timeElapsed: 0 as number,
		timeTotal: 0 as number,
		isShuffled: false as boolean,
		repeat: 0 as number, // 0 = no repeat, 1 = repeat one, 2 = repeat all
	}
}


// document.querySelector("div[class*='controllerTrackInfo_cntrlrTrckTmeWrpr__v8O1b']").addEventListener("DOMSubtreeModified", () => {
// 	console.log(presence.timestampFromFormat(document.querySelector("div[class*='controllerTrackInfo_cntrlrTrckTmeWrpr__v8O1b']").innerHTML.split("/")[0].trim()))

// 	console.log(presence.timestampFromFormat(document.querySelector("div[class*='controllerTrackInfo_cntrlrTrckTmeWrpr__v8O1b']").innerHTML.split("/")[1].trim()))
// });

function getQueueCount() { // get queue count
	data.queue.count = parseInt(document.querySelector("p[class*='queueInfoBar_songsCountTxt__gbOZC']")?.textContent.replace(/[^0-9]/g, "") );

	console.log(data.queue.count)

	addedListeners["queueCount"] = true;
}

const addedListeners: any = {};

function addEvents() {
	//#region player

	const timeTracker = document.querySelector("div[class*='controllerTrackInfo_cntrlrTrckTmeWrpr__v8O1b']");
	if (timeTracker && !addedListeners["timeTracker"]) {
		// add event listener to time tracker
		timeTracker.addEventListener("DOMCharacterDataModified", () => { // time tracker is updated
			data.player.timeElapsed = presence.timestampFromFormat(timeTracker.innerHTML.split("/")[0].trim());
			data.player.timeTotal = presence.timestampFromFormat(timeTracker.innerHTML.split("/")[1].trim());
			console.log('time data updated');
		});
		addedListeners["timeTracker"] = true;
	}

	//#endregion player

	//#region queue

	const queueCount = document.querySelector("p[class*='queueInfoBar_songsCountTxt__gbOZC']");
	if (!addedListeners["queueCount"]) {
		// add event listener to queue count
		queueCount?.addEventListener("DOMCharacterDataModified", () => getQueueCount());
		
	} else if (isNaN(data.queue.count)) getQueueCount();

	//#endregion queue
	
}

addEvents();
setInterval(addEvents, 5000);


presence.on("UpdateData", async () => {
	// data.activeGuild.element = document.querySelector("div[class*='guildNavLink_guildInfoWrapr--active']")

	// // get the child span element of the active guild

	// if (data.activeGuild.element) {
	// 	data.activeGuild.name = data.activeGuild.element.children[2].innerHTML;
	// }

	// // remove non numbers from text and convert to number
	// data.availableGuilds = parseInt(document.querySelector(".musicPlayerNav_guildSrvrCount__2oa_Y")?.innerHTML.replace(/[^0-9]/g, "") || "0");


	// data.isLoggedIn = document.querySelector(".userLoggedInHeader_usrLogdHedrDrpDwnBtn__3oA1o") && true || false;

	// console.log(data);

});