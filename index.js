let myLeads = allFromLocalStorage();

const txt = document.querySelector('#txt');
const btn = document.querySelector('#btn');
const out = document.querySelector('#output');

txt.addEventListener('keydown', (e) => {
	if(e.keyCode === 13){
		insert();
	}
});

btn.addEventListener('click', insert);


function allFromLocalStorage(){
	let leads = localStorage.getItem("myLeads");
	return leads ? JSON.parse(leads) : [];
}

function saveInLocalStorage(){
	localStorage.setItem('myLeads', JSON.stringify(myLeads));
}


function insert(){
	if(txt.value == '') return;
	let input = "http://www." + txt.value + ".com";
	myLeads.push(input);
	saveInLocalStorage();
	txt.value = '';	
	render();
	txt.focus();	
}

function render(){
	out.innerHTML = '';

	if(myLeads.length > 0){
		out.innerHTML = '';
		txt.value = '';

		let table = `
				<table>
					<thead>
						<tr>
							<th>Link</th><th>Action</th>
						</tr>
					</thead>
					<tbody>`;

		myLeads.map(lead => {
			table += `
						<tr>
							<td>
								<a href='${lead}' target='_blank'>
									${lead}
								</a>
							</td>
							<td>
								<a id="${lead}" href="#" class="del-btn" >Löschen</a>						
							</td>
						</tr>`;
		});

		table += `</tbody></table>`;
	
		out.innerHTML = table;

		let delBtns = document.querySelectorAll('.del-btn');

		delBtns.forEach(delBtn => {
			delBtn.addEventListener('click', deleteEntry);
		})

	}
}

function clearLocalStorage(){
	if(myLeads.length == 0){
		localStorage.clear();
	}
}


function deleteEntry(e){
	e.preventDefault();
	let leadToDelete = e.currentTarget.id;

	myLeads = myLeads.filter(lead => lead !== leadToDelete);
	saveInLocalStorage();
	
	clearLocalStorage();	

	render();
}


render();
