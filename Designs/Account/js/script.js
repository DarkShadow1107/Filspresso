function Mail(string) {
	let number = 0;
	let length = string.length;
	for (let i = 0; i < length && number < 2; i++) if (string[i] === "@") number++;
	if (number === 1) return true;
	return false;
}
function containsSpecialChars_password(string) {
	const specialChars = /[`!@#$%^&*()_+\- =\[\]{};':"\\|,.<>\/?~]/;
	return specialChars.test(string);
}
function containsSpecialChars_email(string) {
	const specialChars = /[`!#$%^&*()+\-=\[\]{};':"\\|,<>\/?~]/;
	return specialChars.test(string);
}
function Submit() {
	let Nickname = document.getElementById("signname").value;
	let E_mail = document.getElementById("signemail").value;
	let Password = document.getElementById("signpass").value;
	if (containsSpecialChars_email(E_mail) === false)
		if (
			(E_mail.slice(-10) === "@gmail.com" || E_mail.slice(-12) === "@outlook.com" || E_mail.slice(-10) === "@yahoo.com") &&
			Nickname !== "" &&
			Mail(E_mail)
		)
			if (Password !== "")
				if (Password.length < 10) alert("Your password is too short, it must contains at least 10 characters!");
				else if (containsSpecialChars_password(Password) === false)
					alert("Your password is weak, it must contains special characters as well!");
				else {
					localStorage.setItem("passValue", Password.toString());
					localStorage.setItem("nameValue", Nickname.toString());
					localStorage.setItem("mailValue", E_mail.toString());
					let forgot = false;
					localStorage.setItem("forgotValue", forgot.toString());
					localStorage.setItem("account_made", "true");
					localStorage.setItem("account_log", "true");
					alert("Welcome " + Nickname + ", your account was registered with the following address " + E_mail);
					window.location.href = "./index.html";
				}
			else alert("Please insert a strong password!");
		else alert("Invalid e-mail address or empty username, please insert a valid e-mail address and an username!");
	else {
		alert("Your e-mail address must not contains special characters!");
		alert("BUT some special charcters are allowed, like the following characters: @_.");
	}
}
function Submit_log() {
	let E_mail = document.getElementById("logemail").value;
	let Password = document.getElementById("logpass").value;
	let passValue = localStorage.getItem("passValue");
	let mailValue = localStorage.getItem("mailValue");
	let nameValue = localStorage.getItem("nameValue");
	let forgotValue = localStorage.getItem("forgotValue");

	if (localStorage.getItem("account_made") === "true") {
		if (forgotValue === "false")
			if (mailValue != E_mail || passValue != Password) {
				alert("Your e-mail address or password is incorrect!");
			} else {
				localStorage.setItem("account_log", "true");
				alert("Welcome back " + nameValue + ", here at the Filspresso!");
				window.location.href = "./index.html";
			}
		else if (Password !== "")
			if (Password.length < 10) alert("Your password is too short, it must contains at least 10 characters!");
			else if (containsSpecialChars_password(Password) === false)
				alert("Your password is weak, it must contains special characters as well!");
			else {
				localStorage.setItem("passValue", Password.toString());
				alert("Your password has been changed!");
				alert("Welcome back " + nameValue + ", here at the Filspresso!");
				localStorage.setItem("account_log", "true");
				localStorage.setItem("forgotValue", "false");
				window.location.href = "./index.html";
			}
	} else alert("You need to make an account first!");
}
function Forgot() {
	let E_mail = document.getElementById("logemail").value;
	let Password = document.getElementById("logpass").value;
	localStorage.setItem("forgotValue", "true");
	alert(
		"We're sorry that you forgot yor password, you'll need to enter your e-mail address and the new password in the Log In form."
	);
	Submit_log();
}
