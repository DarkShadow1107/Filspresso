function extractAndConvertFloat(data: string) {
	// Regular expression to match numbers with optional comma and decimal digits
	const regex = /\d+(,\d*)?/g;
	const matches = data.match(regex);

	if (matches) {
		// Replace comma with dot for float conversion and return the first match
		return parseFloat(matches[0].replace(",", "."));
	} else {
		// No match found, return default value (0.0)
		return 0.0;
	}
}
const myItemsKey = "myItems"; // Key for storing the array

// Function to get the current array (or create an empty one if not found)
function getItemsArray(): string[] {
	const storedString = localStorage.getItem(myItemsKey);
	if (storedString) {
		return JSON.parse(storedString);
	} else {
		return []; // Return empty array if not found
	}
}

// Function to add a new item and update local storage
function addItem(newItem: string) {
	const currentArray = getItemsArray();
	let isNotItemNew = 0;
	let itemTimes = parseInt(localStorage.getItem("itemTimes"));
	let index = 0;
	currentArray.forEach((item) => {
		isNotItemNew = 0;
		if (item.includes(newItem)) {
			isNotItemNew = 1;
			itemTimes = parseInt(localStorage.getItem("itemTimes")) + 1;
			localStorage.setItem("itemTimes", itemTimes.toString());
			return;
		}
		index++;
	});
	if (isNotItemNew === 0) {
		localStorage.setItem("itemTimes", "1");
		currentArray.push(newItem);
	} else {
		// Modify existing item by concatenating "x times" if found
		if (index !== -1) {
			currentArray[index] = newItem + " x " + itemTimes;
		}
	}
	const updatedString = JSON.stringify(currentArray);
	localStorage.setItem(myItemsKey, updatedString);
}
document.addEventListener("DOMContentLoaded", () => {
	let sourceDivs = document.querySelectorAll("#sourceDiv");
	let targetDivs = document.querySelectorAll("#targetDiv");

	if (sourceDivs.length === targetDivs.length) {
		sourceDivs.forEach((sourceDiv, index) => {
			let targetDiv = targetDivs[index];
			let data = sourceDiv.textContent || "";
			let numericData = extractAndConvertFloat(data);

			let modifiedData = numericData / 10;
			let formattedDataWithDecimals = modifiedData.toFixed(2).replace(".", ",");

			targetDiv.textContent = `Capsule price: ${formattedDataWithDecimals} RON`;
		});
	} else {
		console.warn(`Unequal number of source and target divs. Please ensure they match.`);
	}
});
document.addEventListener("DOMContentLoaded", () => {
	let sourceDivs = document.querySelectorAll("#sourceDiv");
	let parentDivs = document.querySelectorAll("#parentDiv");
	let sourceItems = document.querySelectorAll("#sourceItem");

	if (sourceDivs.length !== parentDivs.length) {
		console.warn("Mismatch in the number of source and parent divs.");
		//return;
	}

	parentDivs.forEach((parentDiv, index) => {
		let sourceDiv = sourceDivs[index]; // Ensure correct div is referenced
		let sourceItem = sourceItems[index];
		let newDiv = document.createElement("div");
		newDiv.id = "addToBag";
		newDiv.className = "button_add_bag";
		newDiv.textContent = "Add to Bag";
		newDiv.style.cursor = "pointer";

		newDiv.addEventListener("click", () => {
			console.log("Button clicked!");
			let data = sourceDiv.textContent || "";
			let Item = "Coffee capsules sleeve " + sourceItem.textContent + " - " + data;
			addItem(Item || ""); // Get textContent or empty string
			let numericData = extractAndConvertFloat(data);
			let passed = parseFloat(localStorage.getItem("passedValue") || "0.0");
			let sum = passed + numericData;
			localStorage.setItem("passedValue", sum.toString());
			localStorage.setItem("is_clicked", "1");
			alert("Added " + sourceItem.textContent + " to bag!");
		});
		newDiv.addEventListener("mouseover", () => {
			newDiv.style.backgroundColor = "rgba(32, 33, 43, 0.732)";
			newDiv.style.color = "rgb(255, 179, 103)";
			newDiv.style.boxShadow = "0 8px 24px 0 rgba(140, 135, 135, 0.2)";
			newDiv.style.transition = "600ms";
		});
		newDiv.addEventListener("mouseleave", () => {
			newDiv.style.backgroundColor = "rgba(200, 151, 123, 0.233)";
			newDiv.style.color = "rgb(250, 204, 144)";
			newDiv.style.boxShadow = "none";
			newDiv.style.transition = "600ms ease-in-out";
		});
		parentDiv.appendChild(newDiv);
	});
});

document.addEventListener("DOMContentLoaded", () => {
	let sourceDivs = document.querySelectorAll("#sourceDiv2");
	let parentDivs = document.querySelectorAll("#parentDiv2");
	let sourceItems = document.querySelectorAll("#sourceItem2");

	if (sourceDivs.length !== parentDivs.length) {
		console.warn("Mismatch in the number of source and parent divs.");
		//return;
	}

	parentDivs.forEach((parentDiv, index) => {
		let sourceDiv = sourceDivs[index]; // Ensure correct div is referenced
		let sourceItem = sourceItems[index];
		let newDiv = document.createElement("div");
		newDiv.id = "addToBag";
		newDiv.className = "button_add_bag_2";
		newDiv.textContent = "Add to Bag";
		newDiv.style.cursor = "pointer";

		newDiv.addEventListener("click", () => {
			console.log("Button clicked!");
			let data = sourceDiv.textContent || "";
			let Item = sourceItem.textContent + " - " + data;
			addItem(Item || ""); // Get textContent or empty string
			let numericData = extractAndConvertFloat(data);
			let passed = parseFloat(localStorage.getItem("passedValue") || "0.0");
			let sum = passed + numericData;
			localStorage.setItem("passedValue", sum.toString());
			localStorage.setItem("is_clicked", "1");
			alert("Added " + sourceItem.textContent + " to bag!");
		});
		newDiv.addEventListener("mouseover", () => {
			newDiv.style.backgroundColor = "rgba(32, 33, 43, 0.732)";
			newDiv.style.color = "rgb(255, 179, 103)";
			newDiv.style.boxShadow = "0 8px 24px 0 rgba(140, 135, 135, 0.2)";
			newDiv.style.transition = "600ms";
		});
		newDiv.addEventListener("mouseleave", () => {
			newDiv.style.backgroundColor = "rgba(200, 151, 123, 0.233)";
			newDiv.style.color = "rgb(250, 204, 144)";
			newDiv.style.boxShadow = "none";
			newDiv.style.transition = "600ms ease-in-out";
		});
		parentDiv.appendChild(newDiv);
	});
});

document.addEventListener("DOMContentLoaded", () => {
	let sourceDivs = document.querySelectorAll("#sourceDiv3");
	let addSubDivs = document.querySelectorAll("#add_sub");
	let sourceItems = document.querySelectorAll("#sourceItem3");

	sourceDivs.forEach((sourceDiv, index) => {
		let addSubDiv = addSubDivs[index];
		let sourceItem = sourceItems[index];

		addSubDiv.addEventListener("click", () => {
			console.log("Button clicked!");
			let data = sourceDiv.textContent || "";
			let Item = sourceItem.textContent + " Subscription - " + data;
			addItem(Item || ""); // Get textContent or empty string
			let numericData = extractAndConvertFloat(data);
			let passed = parseFloat(localStorage.getItem("passedValue") || "0.0");
			let sum = passed + numericData;
			localStorage.setItem("passedValue", sum.toString());
			localStorage.setItem("is_clicked", "1");
			alert("Added " + sourceItem.textContent + " Subscription to bag!");
		});
	});
});

function isInFullScreen() {
	return !document.fullscreenElement;
}
document.addEventListener('keydown', (event: KeyboardEvent) => {
	let navbar = document.getElementById('sub_navbar');
	//Check if the F11 key was pressed
	if (event.key === 'F11') {
		if (isInFullScreen()) {
			console.log("Page is in Full Screen Mode.");
			navbar.style.marginTop = "-2.3%";
			alert("Press F9 to go back!");
		}
	}
	else {
		console.log("Page is in Normal Mode.");
		navbar.style.marginTop = "-0.3%";
		location.reload();
	}
	if (event.key === "F9") {
		navbar.style.marginTop = "-0.3%";
		console.log("Page is in Normal Mode. F11 key pressed again.");
	}
});

document.addEventListener("DOMContentLoaded", function () {
	// Identify the parent div where the result will be displayed
	let parentDiv = document.getElementById("total");
	let parentDiv_2 = document.getElementById("order");
	let is_clicked = localStorage.getItem("is_clicked");
	function reset() {
		localStorage.setItem("currentSum", "0");
		localStorage.removeItem(myItemsKey);
		window.location.reload();
	}
	// Ensure the parentDiv is found on the page
	if (parentDiv) {
		// Retrieve values from localStorage
		if (is_clicked === "1") {
			localStorage.setItem("is_clicked", "0");
			let passedValue = parseFloat(localStorage.getItem("passedValue") || "0.0");
			let existingSum = parseFloat(localStorage.getItem("currentSum") || "0.0");
			// Calculate the new sum
			let newSum = existingSum + passedValue;
			localStorage.setItem("passedValue", "0");
			// Update the stored sum in localStorage for future use
			localStorage.setItem("currentSum", newSum.toString());
		}
		let displayedSum = parseFloat(localStorage.getItem("currentSum") || "0.0")
			.toFixed(2)
			.toString()
			.concat(" RON")
			.replace(".", ",");
		// Create a new div to display the sum
		let resultDiv = document.createElement("div");
		resultDiv.id = "resultDiv";
		resultDiv.textContent = "Total price of the bag: ".concat(displayedSum);
		resultDiv.style.padding = "5px";
		resultDiv.style.fontSize = "23px";
		resultDiv.style.marginLeft = "2%";
		resultDiv.style.width = "42%";
		resultDiv.style.color = "rgb(250, 204, 144)";
		resultDiv.style.backgroundColor = "transparent"; // Optional: adds a background color for distinction
		// Append the new div to the parent div
		parentDiv.appendChild(resultDiv);
		let resetButton = document.createElement("button");
		resetButton.id = "resetButton";
		resetButton.textContent = "Empty the bag";
		resetButton.style.float = "right";
		resetButton.style.padding = "7px";
		resetButton.style.width = "16%";
		resetButton.style.fontSize = "23px";
		resetButton.style.transform = "translateY(-40px)";
		resetButton.style.cursor = "pointer";
		resetButton.style.marginRight = "2%";
		resetButton.style.color = "rgb(250, 204, 144)";
		resetButton.style.border = "none";
		resetButton.style.borderRadius = "30px";
		resetButton.style.backgroundColor = "rgba(200, 151, 123, 0.233)";
		resetButton.addEventListener("mouseover", () => {
			resetButton.style.backgroundColor = "rgba(36, 37, 48, 0.556)";
			resetButton.style.color = "rgb(255, 179, 103)";
			resetButton.style.boxShadow = "0 8px 24px 0 rgba(140, 135, 135, 0.2)";
			resetButton.style.transition = "600ms";
		});
		resetButton.addEventListener("mouseleave", () => {
			resetButton.style.backgroundColor = "rgba(200, 151, 123, 0.233)";
			resetButton.style.color = "rgb(250, 204, 144)";
			resetButton.style.boxShadow = "none";
			resetButton.style.transition = "600ms ease-in-out";
		});
		resetButton.addEventListener("click", function () {
			// Code to execute on click (e.g., reset function)
			reset();
		});
		parentDiv.appendChild(resetButton);
		let items = getItemsArray();

		let itemListDiv = document.createElement("div");
		itemListDiv.className = "itemListBag";
		itemListDiv.style.borderRadius = "10px";
		itemListDiv.style.width = "45%";
		itemListDiv.style.marginBottom = "1%";
		itemListDiv.style.transform = "translateY(12%)";
		itemListDiv.style.border = "1px solid rgb(253, 202, 136)";
		itemListDiv.innerHTML = ""; // Clear previous content

		// Check if any items are stored
		if (items.length > 0) {
			const listItems = items.map((item) => `<li>${item}</li>`).join("");
			itemListDiv.innerHTML = `<ul>${listItems}</ul>`;
			parentDiv.appendChild(itemListDiv);
		}
		let placeOrderButton = document.createElement("button");
		placeOrderButton.textContent = "Place order";
		placeOrderButton.style.float = "right";
		placeOrderButton.style.padding = "7px";
		placeOrderButton.style.width = "13%";
		placeOrderButton.style.fontSize = "23px";
		placeOrderButton.style.cursor = "pointer";
		placeOrderButton.style.position = "absolute";
		placeOrderButton.style.left = "43.5%";
		placeOrderButton.style.marginBottom = "1.2%";
		placeOrderButton.style.marginTop = "1.2%";
		placeOrderButton.style.transform = "translateY(80%)";
		placeOrderButton.style.color = "rgb(250, 204, 144)";
		placeOrderButton.style.border = "none";
		placeOrderButton.style.borderRadius = "30px";
		placeOrderButton.style.backgroundColor = "rgba(200, 151, 123, 0.233)";
		placeOrderButton.addEventListener("mouseover", () => {
			placeOrderButton.style.backgroundColor = "rgba(36, 37, 48, 0.556)";
			placeOrderButton.style.color = "rgb(255, 179, 103)";
			placeOrderButton.style.boxShadow = "0 8px 24px 0 rgba(140, 135, 135, 0.2)";
			placeOrderButton.style.transition = "600ms";
		});
		placeOrderButton.addEventListener("mouseleave", () => {
			placeOrderButton.style.backgroundColor = "rgba(200, 151, 123, 0.233)";
			placeOrderButton.style.color = "rgb(250, 204, 144)";
			placeOrderButton.style.boxShadow = "none";
			placeOrderButton.style.transition = "600ms ease-in-out";
		});
		placeOrderButton.addEventListener("click", function () {
			// Code to execute on click (e.g., reset function)
			if (displayedSum === "0,00 RON") {
				alert("Your bag is empty. You'll need to buy something to place an order.");
				window.location.href = './coffee.html';
			}
			else {
				alert("Your order worth " + displayedSum + " is processing!");

                window.location.href = './payment.html';
			}
		});
		parentDiv_2.appendChild(placeOrderButton);
	} else {
		// Log an error or alert if the parent div is not found
		console.error("sumContainer div not found on this page.");
	}
});
