/** 
 * Creating Employee details page which store in JSON 
 * **/

/**
 * type: input type value : desired value name: auto generated name id:
 * increment id
 */
function createInput(type, value, name) {
	var _input = document.createElement("INPUT");
	_input.setAttribute("type", type);
	_input.setAttribute("name", name);
	_input.setAttribute("value", value);
	_input.setAttribute("id", type + _number);

	return _input;
}
// tracking num
var _number = 0;
// parent element
var container = document.getElementById("container");
// creating textnode
function TextNode(text) {
	var _lable = document.createElement("LABLE");
	var _text = document.createTextNode(text);
	_lable.appendChild(_text);
	return _lable;
}
// space elements
function addSpace() {

	var space = document
			.createTextNode('\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0');
	return space;
}
// add div element when we press add button
function addElement() {
	var createDiv = document.createElement("DIV");
	createDiv.setAttribute("name", "employTag");
	createDiv.setAttribute("id", "div" + _number);
	createDiv.setAttribute("CLASS", "empDetails");
	return createDiv;
}
// show button: show the individual elements info
function showInd() {
	try{
	var id = this.parentElement.getAttribute("ID").split("div")[1];
	console.log(id);
	var x = "Gender :"
			+ this.parentElement.querySelector("input[name='RADIO" + id
					+ "']:checked").value
			+ " "
			+ "Name :"
			+ this.parentElement.querySelector("input[name='Emp" + id + "']").value;

	alert(x);}catch(Exception){
		alert("Please enter the values");
	}
}
// formelements : appending input fields and appending to the container
function formelements() {
	var divtion = addElement();
	divtion.appendChild(createInput("CHECKBOX", " ", "SELECTCHECKBOX"));
	divtion.appendChild(addSpace());
	divtion.appendChild(createInput("RADIO", "MALE", "RADIO" + _number));
	divtion.appendChild(TextNode("Male"));
	divtion.appendChild(createInput("RADIO", "FEMALE", "RADIO" + _number));
	divtion.appendChild(TextNode("FeMale"));
	divtion.appendChild(addSpace());
	divtion.appendChild(createInput("Text", " ", "Emp" + _number));
	divtion.appendChild(addSpace());
	divtion.appendChild(createButton("ADD", formelements));
	divtion.appendChild(createButton("DELETE", deleteElement));
	divtion.appendChild(createButton("Show", showInd));
	container.appendChild(divtion);
	_number++;
	// createJSON();
}
// button creation funtion
function createButton(value, bfunction) {

	var _button = document.createElement("BUTTON");
	_button.setAttribute("type", "BUTTON")
	_button.onclick = bfunction;
	_button.appendChild(TextNode(value));
	return _button;
}
// /element delete present row
function deleteElement() {
	// var id=this.parentElement.getAttribute("ID");
	return this.parentElement.remove();
}
// create JSON data
function createJSON() {
	var EmployeeDetails = document.getElementsByClassName("empDetails");

	var getEmployeedetails = {};
	var EmployeeInput = [];
	try {
		for (var i = 0; i < EmployeeDetails.length; i++) {

			var id = EmployeeDetails[i].children[0].id.split("CHECKBOX")[1];

			EmployeeInput.push({
				"gender" : EmployeeDetails[i].querySelector("input[name='RADIO"
						+ id + "']:checked").value,
				"Name" : EmployeeDetails[i].querySelector("input[name='Emp"
						+ id + "']").value
			});

		}
	} catch (Exception) {
		alert("Please enter the values")
	}

	return EmployeeInput;

}
// delete elements which are checked
function deleteCheckBox() {
	var checkedItems = document.getElementsByName("SELECTCHECKBOX");
	var checkedList = [];
	var arlenght = checkedItems.length;
	var checkElements = [];

	for (var i = 0; i < arlenght; i++) {
		console.log("ID :" + checkedItems[i].getAttribute("id"));
		if (checkedItems[i].checked) {

			checkElements.push(document.getElementById(checkedItems[i]
					.getAttribute("id")));

		}
	}
	if (checkElements == 0) {
		alert("Please check the CheckBOX")
	} else {
		for (var p = 0; p < checkElements.length; p++) {
			console.log(checkElements[p]);
			document.getElementById(checkElements[p].id).parentElement.remove();

		}
	}

}

formelements();

// createJSON();
function submitDetails() {
	var getJSon = createJSON();
	console.log(getJSon);
	var id = 1;
	var x = " ";
	for (var p = 0; p < getJSon.length; p++) {

		x += "ID " + id + "   NAME" + getJSon[p].Name + ",    Gender"
				+ getJSon[p].gender + "\n";
		id++;
	}
	window.alert(x);
}

// appending deleteall and submit button to the form
container.parentElement.appendChild(createButton("DELETEALL",
		deleteCheckBox)).setAttribute("align","left");
container.parentElement.appendChild(createButton("Submit",
		submitDetails));