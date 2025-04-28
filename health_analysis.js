const addPatientButton = document.getElementById('addPatient');
const errorMsg = document.getElementById('errorMsg');
errorMsg.style.color = 'red';
const report = document.getElementById('report');

const nameElement = document.getElementById('name');
const ageElement = document.getElementById('age');
const conditionElement = document.getElementById('condition');

// Store collected patients data
const patients = [];

function addPatient() {
  const name = nameElement.value.trim();

  const selectedGender = document.querySelector('input[name="gender"]:checked');
  const gender = selectedGender ? selectedGender.value.trim() : '';

  const age = parseInt(ageElement.value.trim());
  const condition = conditionElement.value.trim();

  if (name && gender && age && condition) {
    errorMsg.textContent = '';

    patients.push({
      name: name,
      gender: gender,
      age: age,
      condition: condition,
    });

    resetForm();
    generateReport();

    // // Log patients data
    // let index = 0;
    // patients.forEach(patient => {
    //   // Object.entries(patient).forEach(([key, value]) => {
    //   //   console.log(`${key}: ${value}`);
    //   // });

    //   console.log(`${++index}:`);
    //   for (const key in patient) {
    //     console.log(`${key}: ${patient[key]}`);
    //   }
    // });
    // console.log('━━━━━━━━━━━━━━━');
  } else {
    errorMsg.textContent = "All fields need to be filled in/selected";
    return;
  }
}

addPatientButton.addEventListener('click', addPatient);

function resetForm() {
  nameElement.value = '';

  const selectedGender = document.querySelector('input[name="gender"]:checked');
  if (selectedGender) {
    selectedGender.checked = false;
  }

  age.value = '';
  condition.value = '';
}

function generateReport() {
  report.textContent = "";

  const conditionsCount = {
    Diabetes: 0,
    Thyroid: 0,
    'High Blood Pressure': 0,
  };

  const genderConditionsCount = {
    Male: {
      Diabetes: 0,
      Thyroid: 0,
      'High Blood Pressure': 0,
    },
    Female: {
      Diabetes: 0,
      Thyroid: 0,
      'High Blood Pressure': 0,
    },
  }

  // Aligning conditionsCount and genderConditionsCount with patients
  for (const patient of patients) {
    conditionsCount[patient.condition]++;
    genderConditionsCount[patient.gender][patient.condition]++;
  }

  const createElementHelper = (type, content) => {
    const element = document.createElement(type);
    element.textContent = content;
    return element;
  }

  const reportOuterDiv = document.createElement('div');
  const reportInnerDiv1 = document.createElement('div');
  const reportInnerDiv2 = document.createElement('div');
  const reportInnerDiv3 = document.createElement('div');

  /* --------- */

  const patientNumPara = createElementHelper('p', `Number of patients: ${patients.length}`);
  reportInnerDiv1.appendChild(patientNumPara);
  reportOuterDiv.appendChild(reportInnerDiv1);

  /* --------- */

  const condBreakdownPara = createElementHelper('p', 'Conditions Breakdown:');
  reportInnerDiv2.appendChild(condBreakdownPara);
  const condUl = document.createElement('ul');
  for (const condition in conditionsCount) {
    const condLi = createElementHelper('li', `${condition}: ${conditionsCount[condition]}`);
    condUl.appendChild(condLi);
  }
  reportInnerDiv2.appendChild(condUl);
  reportOuterDiv.appendChild(reportInnerDiv2);

  /* --------- */

  const genderBasedPara = createElementHelper('p', 'Gender-Based Conditions:');
  reportInnerDiv3.appendChild(genderBasedPara);
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');
  const headerRow = document.createElement('tr');
  const blankHeaderCell = document.createElement('th')
  headerRow.appendChild(blankHeaderCell);

  for (const gender in genderConditionsCount) {
    const genderHeaderCell = createElementHelper('th', gender);
    headerRow.appendChild(genderHeaderCell);
  }

  const conditions = Object.keys(genderConditionsCount.Male);
  console.log(conditions);

  for (const condition of conditions) {
    const bodyRow = document.createElement('tr');
    const conditionCell = createElementHelper('td', condition);
    bodyRow.appendChild(conditionCell);

    for (const gender in genderConditionsCount) {
      const countCell = createElementHelper('td', genderConditionsCount[gender][condition]);
      bodyRow.appendChild(countCell);
    }
    tbody.appendChild(bodyRow);
  }

  thead.appendChild(headerRow);
  table.appendChild(thead);
  table.appendChild(tbody);
  reportInnerDiv3.appendChild(table);
  reportOuterDiv.appendChild(reportInnerDiv3);
  report.appendChild(reportOuterDiv);
}

/* ---------------
  SEARCH FEATURE
--------------- */

const conditionInput = document.getElementById('conditionInput');
const btnSearch = document.getElementById('btnSearch');
const result = document.getElementById('result');

function searchCondition() {
  const input = conditionInput.value.toLowerCase();

  fetch('./health_analysis.json')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const condition = data.conditions.find(item => item.name.toLowerCase() === input);

      if (!condition) { 
        result.innerHTML = `<p>Condition not found</p>`;
      } else { 
        result.innerHTML = "";
        result.innerHTML += `<h2>${condition.name}</h2>`;
        result.innerHTML += `<img src="${condition.imagesrc}" style="width: 10rem; height: 10rem; object-position: 50% 50%;">`;
        result.innerHTML += `<p><strong>Symptoms:</strong> ${condition.symptoms.join(', ')}</p>`;
        result.innerHTML += `<p><strong>Prevention:</strong> ${condition.prevention.join(', ')}</p>`;
        result.innerHTML += `<p><strong>Treatment:</strong> ${condition.treatment}</p>`;
      }
    })
    .catch(error => {
      console.error(error);
    });
}

btnSearch.addEventListener('click', searchCondition);