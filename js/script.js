(function($) {
	$(function() {
		// provide crossword entries in an array of objects like the following example
		// Position refers to the numerical order of an entry. Each position can have 
		// two entries: an across entry and a down entry
		var puzzleData = [
			 	{
					clue: "Don't get any of these while racing the Iditarod.",
					answer: "dogbites",
					position: 1,
					orientation: "across",
					startx: 1,
					starty: 1
				},
			 	{
					clue: "Use this to protect the family jewels.",
					answer: "cup",
					position: 5,
					orientation: "across",
					startx: 10,
					starty: 1
				},
				{
					clue: "Bitcoin made this team possible.",
					answer: "realbedford",
					position: 6,
					orientation: "across",
					startx: 1,
					starty: 3
				},
				{
					clue: "first name of a decorated quarterback who was also a shitcoiner",
					answer: "tom",
					position: 8,
					orientation: "across",
					startx: 1,
					starty: 5
				},
				{
					clue: "This is the only sport I know of that is also the name of an animal.",
					answer: "cricket",
					position: 10,
					orientation: "across",
					startx: 5,
					starty: 5
				},
				{
					clue: "This league has a cute, alliterative branding with NBC.",
					answer: "nba",
					position: 11,
					orientation: "across",
					startx: 2,
					starty: 6
				},
				{
					clue: "This desperate play is named after a prayer.",
					answer: "nba",
					position: 13,
					orientation: "across",
					startx: 5,
					starty: 7
				},
				{
					clue: "both a device for equestrians and a technique for soccer players",
					answer: "footstall",
					position: 15,
					orientation: "across",
					startx: 3,
					starty: 9
				},
				{
					clue: "A zamboni will leave your rink this way.",
					answer: "cleaner",
					position: 16,
					orientation: "across",
					startx: 3,
					starty: 11
				},
				{
					clue: "Ohio State shares an acronym with this competitor.",
					answer: "oregon",
					position: 2,
					orientation: "down",
					startx: 2,
					starty: 1
				},
				{
					clue: "arguably the most obiquitous object in sports",
					answer: "ball",
					position: 3,
					orientation: "down",
					startx: 4,
					starty: 1
				},
				{
					clue: "The most famous Olympic basketball team.",
					answer: "thedreamteam",
					position: 4,
					orientation: "down",
					startx: 6,
					starty: 1
				},
				{
					clue: "Named for one important tool in a pitcher's bag of tricks, I hope some of these questions are this for you!",
					answer: "curveball",
					position: 4,
					orientation: "down",
					startx: 10,
					starty: 1
				},
				{
					clue: "name for both a player's abilities and the whole friggin' stadium",
					answer: "facilities",
					position: 7,
					orientation: "down",
					startx: 8,
					starty: 3
				},
				{
					clue: "Before I got my wires crossed, this answer was originally supposed to be MLB, but I image that hunderds of people with this work for them.",
					answer: "mba",
					position: 9,
					orientation: "down",
					startx: 3,
					starty: 5
				},
				{
					clue: "nah nah nah nah, nah nah nah nah, hey hey hey, good blank",
					answer: "bye",
					position: 12,
					orientation: "down",
					startx: 12,
					starty: 6
				},
				{
					clue: "some of the things that you want to accomplish with 3 down",
					answer: "goals",
					position: 14,
					orientation: "down",
					startx: 4,
					starty: 8
				}
			] 
	
		$('#puzzle-wrapper').crossword(puzzleData);
		
	})
	
})(jQuery)

let toggleState = 0;
let usdPrice = null;
let blockHeight = null;
let satFee = null;

async function fetchPrice() {
	try {
		const response = await fetch('https://mempool.space/api/v1/prices');
		const data = await response.json();
		usdPrice = data.USD.toFixed();
	} catch (error) {
		console.error('Error fetching the price:', error);
	}
}

async function fetchBlock() {
	try {
		const response = await fetch('https://blockchain.info/q/getblockcount');
		const data = await response.text();
		blockHeight = parseInt(data).toFixed(0);
	} catch (error) {
		console.error('Error fetching the price:', error);
	}
}

async function fetchFee() {
	try {
		const response = await fetch('https://mempool.space/api/v1/fees/recommended');
		const data = await response.json();
		satFee = data.halfHourFee.toFixed();
		console.log(satFee);
	} catch (error) {
		console.error('Error fetching the price:', error);
	}
}

async function togglePrice() {
	if (!usdPrice) {
		await fetchPrice();
	}
	if (!blockHeight) {
		await fetchBlock();
	}
	if (!satFee) {
		await fetchFee();
	}

	const button = document.querySelector('.onesat');
	switch (toggleState) {
		case 0:
			button.textContent = `${blockHeight}`;
			break;
		case 1:
			button.textContent = `${satFee} sat/vB`;
			break;
		case 2:
			button.textContent = `$${usdPrice}`;
			break;
		case 3:
			button.textContent = '1sat=1sat';
			break;
	}
	toggleState = (toggleState + 1) % 4;
}