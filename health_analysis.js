const btnSearch = document.getElementById('btnSearch');
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