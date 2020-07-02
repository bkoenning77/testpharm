

let button = document.getElementById('search');
let field = document.getElementById('idlabelercode');
let tf = document.getElementById('textoutput');


button.addEventListener('click', evt => {
	//let text = requestData();
	//let t = document.createTextNode(text);
	//tf.appendChild(t);
	requestData();
});


function requestData() {

	let request = new XMLHttpRequest();
	let param = `url=${field.value}`;

	request.open("POST", "requestparam.php", true);
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	//request.setRequestHeader("Content-Length", param.length);
	//request.setRequestHeader("Connection", "close");

	request.onreadystatechange = function() {
		if (this.readyState == 4) {
			if (this.status == 200) {
				if (this.responseText != null) {
					let text = this.responseText;
					let t = document.createTextNode(text);
					tf.appendChild(t);
				}
				else {
					alert('No data received');
				}
			}
			else {
				alert(this.statusText);
			}
		}
	}
	request.send(param);
	//return param;
}

window.addEventListener('load', evt => {
	runLabeler();
	//console.log('brandon');
	//let div = document.getElementById('outputdiv');
	//let output = document.createTextNode(result);
	//div.appendChild(output);
});

function generateLabels(jsonObj) {
	let a = JSON.parse(jsonObj);
	let table = document.createElement('table');
	table.setAttribute('id', 'labelertable');

	for (let i = 0; i < 6; i++) {
		let codeHead = document.createElement('th');
		let labelerHead = document.createElement('th');
		let codeLabel = document.createTextNode('Labeler Code');
		let labelerLabel = document.createTextNode('Labeler');
		codeHead.appendChild(codeLabel);
		labelerHead.appendChild(labelerLabel);
		table.appendChild(codeHead);
		table.appendChild(labelerHead);
	}
	console.log(typeof(a));

	for (prop in a) {
		console.log(prop);
	}

//console.log(a);
	document.body.appendChild(table);
}

function runLabeler() {
	let request = new XMLHttpRequest();
	request.open('POST', 'requestlabelers.php', true);
	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	request.onreadystatechange = function() {
		if (this.readyState == 4) {
			if(this.status == 200) {
				if (this.responseText != null) {
					generateLabels(this.responseText);
				}
				else {
					return ('response text null');
				}
			}
			else {
				return ('bad status');
			}
		}
		else {
			return ('bad ready state');
		}
	}
	request.send();
}