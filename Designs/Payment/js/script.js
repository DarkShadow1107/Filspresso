function creditCard() {
	return {
		// Runs when the component is initialized to format any existing values:
		init() {
			this.formatExpirySpacing();
			this.formatCreditCard();
		},
		/**
		 * Start Credit Card Number Formatting
		 */
		ccNum: "",
		ccType: null,
		ccSecurity: 3,
		ccLength: "",
		// Formats the credit card number any time a key is pressed:
		formatCreditCard() {
			// Remove the spaces from the displayed formatted number
			const spacelessCc = this.ccNum.replace(/\D/g, "");
			// Find out what type of credit card we're dealing with
			this.getCcType(spacelessCc);
			// Format the string for display
			this.ccNum = this.formatCcNumber(spacelessCc);
		},

		// Find out what type of credit card we're dealing with
		getCcType(ccNum) {
			// Loop through the card type available
			for (var i in this.cardTypes) {
				const cardType = this.cardTypes[i];

				// Check if the current CC number matches this card type regex
				if (ccNum.match(cardType.pattern)) {
					// Set credit card variables in Alpine
					this.ccType = cardType;
					this.ccLength = cardType.format.length;
					this.ccSecurity = cardType.security;
					return cardType;
				} else {
					// Clear Alpine variables
					this.ccType = null;
					this.ccLength = null;
					this.ccSecurity = 3;
				}
			}
		},
		// Format the credit card number based on the card type pattern
		formatCcNumber(ccNum) {
			let numAppendedChars = 0;
			let formattedNumber = "";
			let cardFormatIndex = "";

			// Just return the provided number if we don't know the card type
			if (!this.ccType) {
				return ccNum;
			}

			const cardFormatString = this.ccType.format;

			// Loop through the characters in the CC number
			for (var i = 0; i < ccNum.length; i++) {
				cardFormatIndex = i + numAppendedChars;

				if (!cardFormatString || cardFormatIndex >= cardFormatString.length) {
					// Return the provided CC number if we don't have a card format string or the index is longer than the format length
					return ccNum;
				}

				if (cardFormatString.charAt(cardFormatIndex) !== "x") {
					// If we encounter a space in the format string, increment the number of added characters
					numAppendedChars++;
					// Add the whitespace character to our formatted number string
					formattedNumber += cardFormatString.charAt(cardFormatIndex) + ccNum.charAt(i);
				} else {
					// If we encounter an 'x', just add the current digit of the CC number to our formatted number string
					formattedNumber += ccNum.charAt(i);
				}
			}

			return formattedNumber;
		},

		// Types of credit cards and their formatting:
		cardTypes: {
			"American Express": {
				name: "American Express",
				code: "ax",
				security: 4,
				pattern: /^3[47]/, // Starts with 34 or 37
				format: "xxxx xxxxxx xxxxx",
				image: "Designs/Payment/images/American_Express.png",
			},
			Visa: {
				name: "Visa",
				code: "vs",
				security: 3,
				pattern: /^4/, // Starts with 4
				format: "xxxx xxxx xxxx xxxx",
				image: "Designs/Payment/images/Visa.png",
			},
			Discover: {
				name: "Discover",
				code: "ds",
				security: 3,
				pattern: /^6(?:011|5)/, // Starts with 6011 or 65
				format: "xxxx xxxx xxxx xxxx",
				image: "Designs/Payment/images/Discover.png",
			},
			Mastercard: {
				name: "Mastercard",
				code: "mc",
				security: 3,
				pattern: /^5[1-5]/, // Starts with 51, 52, 53, 54, or 55
				format: "xxxx xxxx xxxx xxxx",
				image: "Designs/Payment/images/Mastercard.png",
			},
			Unknown: {
				name: "Unknown",
				code: "un",
				security: 3,
				format: "xxxx xxxx xxxx xxxx",
			},
		},
		/**
		 * Start Expiration Date Formatting
		 */
		expiry: "",
		expiryMonthRegex: /^\d{2}$/, // matches "MM"
		expiryMonthSlashRegex: /^\d{2} \/$/, // matches "MM /"
		expirySpacelessRegex: /^\d{2}\/\d+$/, // matches "MM/YYYY"
		// Inserts a space on either side of slash if none exists:
		formatExpirySpacing() {
			// Test expiration date with regex for spaceless dates
			const isExpirySpaceless = this.expirySpacelessRegex.exec(this.expiry);

			if (isExpirySpaceless) {
				// split the date at the slash
				const parts = this.expiry.split("/");
				// reformat expiry with a slash with space around
				this.expiry = parts[0] + " / " + parts[1];
			}
		},
		// Format the expiration date as user types:
		formatExpiryInput(e) {
			// Test expiration date with regexes for only month entered and month with slash
			const isMonthEntered = this.expiryMonthRegex.exec(this.expiry);
			const isMonthSlashEntered = this.expiryMonthSlashRegex.exec(this.expiry);

			if (isMonthSlashEntered && e.key === "Backspace") {
				// If the month and slash already exist and no year entered and user has hit backspace, delete the slash and the 2nd month digit

				this.expiry = this.expiry.slice(0, -3);
			} else if (isMonthEntered && e.key >= 0 && e.key <= 9) {
				// If user has entered 2 digits for month, reformat to insert slash with spaces around
				this.expiry = this.expiry + " / ";
			}

			// clean up expiration date spacing, just in case
			this.formatExpirySpacing();
		},
		getCardImage() {
			if (this.ccType && this.ccType.image) {
				localStorage.setItem("cType", this.ccType.name);
				return this.ccType.image;
			}
			localStorage.setItem("cType", "Unknown");
			return null; // Return null if no card type or image is found
		},
	};
}

function glassmorphicAlert(message, options = {}) {
	const {
		duration = 5000,
		backgroundColor = "rgba(108, 68, 35, 0.86)",
		textColor = "#fff8e1",
		blurRadius = "10px",
		borderRadius = "10px",
		width = "300px",
		padding = "20px",
		boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)",
		fontFamily = "sans-serif",
		fontSize = "16px",
	} = options;

	const alertContainer = document.createElement("div");
	alertContainer.style.position = "fixed";
	alertContainer.style.zIndex = "9999";
	alertContainer.style.top = "20px";
	alertContainer.style.left = "50%";
	alertContainer.style.transform = "translateX(-50%)";

	const alertBox = document.createElement("div");
	alertBox.style.backgroundColor = backgroundColor;
	alertBox.style.backdropFilter = `blur(${blurRadius})`;
	alertBox.style.webkitBackdropFilter = `blur(${blurRadius})`;
	alertBox.style.color = textColor;
	alertBox.style.borderRadius = borderRadius;
	alertBox.style.width = width;
	alertBox.style.padding = padding;
	alertBox.style.boxShadow = boxShadow;
	alertBox.style.fontFamily = fontFamily;
	alertBox.style.fontSize = fontSize;
	alertBox.style.textAlign = "center";
	alertBox.innerHTML = message;

	alertContainer.appendChild(alertBox);
	document.body.appendChild(alertContainer);

	setTimeout(() => {
		alertContainer.remove();
	}, duration);
}

function isUnsignedNumeric(value) {
	for (let i = 0; i < value.length; i++) {
		const charCode = value.charCodeAt(i);
		if (charCode < 48 || charCode > 57) {
			return false; // Not a digit (0-9)
		}
	}
	return true;
}

function removeAllSpaces(str) {
	return str.replace(/\s|&nbsp;/g, "");
}

async function sendPaymentConfirmationEmail() {
	try {
		const userEmail = localStorage.getItem("mailValue");
		const userName = localStorage.getItem("nameValue");

		if (!userEmail) {
			console.error("User email not found.");
			return;
		}

		const items = JSON.parse(localStorage.getItem("myItems")) || [];

		emailjs.init("T-VQxrMdcr_OdDWSa");

		await emailjs.send(
			"service_c2nhc5y",
			"template_z6i4fwr",
			{
				to_email: userEmail,
				to_name: userName,
				items_list: items,
			},
			"T-VQxrMdcr_OdDWSa"
		);
		console.log("Email sent successfully!");
	} catch (error) {
		console.error("Error sending email:", error);
	}
}

function Payment() {
	let cType = localStorage.getItem("cType");

	const cvvNumber = document.getElementById("cvv").value;

	let payment = parseFloat(localStorage.getItem("currentSum") || "0.0");

	let card = document.getElementById("cc").value;

	card = removeAllSpaces(card);

	if (isUnsignedNumeric(cvvNumber) && cvvNumber.length >= 3) localStorage.setItem("cvv_full", "1");
	else localStorage.setItem("cvv_full", "0");

	let cvv_full = localStorage.getItem("cvv_full");

	if (localStorage.getItem("account_log") === "true") {
		if (cType === "Unknown") glassmorphicAlert("You need to enter a valid form of payment! For example a Visa card.");
		else if (card.length !== 16 && card.length !== 15 && cType !== "American Express")
			glassmorphicAlert(
				"You need to enter a card number formed of 16 digits or 15 digits if it is an American Express card!"
			);
		else if (cvv_full === "0")
			glassmorphicAlert("Your CVV code should be formed of 3 digits or 4 if it is an American Express card!");
		else {
			localStorage.setItem("currentSum", "0");
			localStorage.setItem("account_log", "false");

			glassmorphicAlert(
				"Your " +
					cType +
					" card will be charged " +
					payment +
					" RON, and the package will be delivered as soon as posible!"
			);

			sendPaymentConfirmationEmail();

			localStorage.removeItem("myItems");

			setTimeout(function () {
				window.location.href = "./coffee.html";
			}, 4300);
		}
	} else glassmorphicAlert("You need to log in or make an account with us first!");

	localStorage.setItem("cNum_full", "0");
	localStorage.setItem("cvv_full", "0");
	localStorage.setItem("cType", "");

	setTimeout(function () {
		window.location.reload();
	}, 5000);
}
