document.addEventListener('DOMContentLoaded', () => {
  let enkripsi = true;
  let inputValue = [];
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const enkripsiButton = document.querySelector('.title-enc');
  const dekripsiButton = document.querySelector('.title-dec');
  const subtitleInsert = document.querySelector('.subtitle-insert');
  const subtitleResult = document.querySelector('.subtitle-result');
  const minCounterKeyA = document.querySelector('.min-counter-key-a');
  const plusCounterKeyA = document.querySelector('.plus-counter-key-a');
  const minCounterKeyB = document.querySelector('.min-counter-key-b');
  const plusCounterKeyB = document.querySelector('.plus-counter-key-b');
  const keyA = document.querySelector('.key-a-value');
  const keyB = document.querySelector('.key-b-value');
  const input = document.querySelector('.input-insert');
  const result = document.querySelector('.input-result');
  const warning = document.querySelector('.modal-container');
  let keyATemporary = parseInt(keyA.value);

  keyA.addEventListener('change', (e) => {
    if (!coprimeDetector(e.target.value)) {
      warning.style.display = 'flex';
      document.querySelector('body').style.overflow = 'hidden';
      const closeBtn = document.querySelector('.close-button');
      const confirmBtn = document.querySelector('.confirm-button');
      closeBtn.addEventListener('click', () => {
        document.querySelector('body').style.overflow = 'visible';
        warning.style.display = 'none';
        keyA.value = 1
      })
      confirmBtn.addEventListener('click', () => {
        document.querySelector('body').style.overflow = 'visible';
        warning.style.display = 'none';
        keyA.value = 1  
      })
    }
    input.value = '';
    result.value = '';
  })

  enkripsiButton.addEventListener('click', () => {
    if (!enkripsi) {
      enkripsi = true;
      input.value = ''
      result.value = ''
      subtitleResult.innerText = 'Ciphertext';
      subtitleInsert.innerText = 'Plaintext';
      enkripsiButton.style.color = '#e74c3c';
      dekripsiButton.style.color = '#bdc3c7'
    }
  })
  
  dekripsiButton.addEventListener('click', () => {
    if (enkripsi) {
      input.value = ''
      result.value = ''
      enkripsi = false;
      subtitleResult.innerText = 'Plaintext';
      subtitleInsert.innerText = 'Ciphertext';
      dekripsiButton.style.color = '#e74c3c';
      enkripsiButton.style.color = '#bdc3c7';
    }
  })

  minCounterKeyA.addEventListener('click', () => {
    if (parseInt(keyA.value) > 1) {
      input.value = '';
      result.value = '';
      let keyATemp = keyATemporary - 1;
      if (coprimeDetector(keyATemp)) {
        keyATemporary = keyATemp
        keyA.value = keyATemp
      } else {
        keyATemporary = keyATemp
        minCounterKeyA.click();
      }
    }
  })

  plusCounterKeyA.addEventListener('click', () => {
    input.value = '';
    result.value = '';
    let keyATemp = keyATemporary + 1;
    if (coprimeDetector(keyATemp)) {
      keyATemporary = keyATemp
      keyA.value = keyATemp
    } else {
      keyATemporary = keyATemp
      plusCounterKeyA.click();
    }
  })

  minCounterKeyB.addEventListener('click', () => {
    let keyBTemp = parseInt(keyB.value)
    if(keyBTemp > 1) {
      input.value = '';
      result.value = '';
      keyBTemp -= 1;
    }
    keyB.value = keyBTemp;
  })

  plusCounterKeyB.addEventListener('click', () => {
    input.value = '';
    result.value = '';
    let keyBTemp = parseInt(keyB.value)
    keyBTemp += 1;
    keyB.value = keyBTemp;
  })

  input.addEventListener('input', (e) => {
    const valueInArray = e.target.value.split('');
    inputValue = [];

    valueInArray.forEach(value => {
      let resultIndex = null;
      const indexOfChar = alphabet.indexOf(value.toLowerCase());
      if (indexOfChar >= 0 && indexOfChar <= 25) {
        let keyAInt = parseInt(keyA.value)
        const keyBInt = parseInt(keyB.value)
        if (enkripsi) {
          resultIndex = ((keyAInt * indexOfChar) + keyBInt)
        } else {
          keyAInt = multiplicativeInvers(keyAInt);
          resultIndex = (keyAInt * indexOfChar) - (keyAInt * keyBInt)
          console.log(keyAInt);
        }
        const resultChar = alphabet.charAt(((resultIndex % 26) + 26) % 26)
        inputValue.push(resultChar)
      } else {
        inputValue.push(value)
      }
    })
    
    result.value = inputValue.join('');
  })

  const coprimeDetector = (num1) => {
    const smaller = num1 > 26 ? num1 : 26;
      for(let i = 2; i < smaller; i++){
        const condition1 = num1 % i === 0;
        const condition2 = 26 % i === 0 ;
        if(condition1 && condition2) {
          return false;
        }
      }
      return num1;
  }

  const multiplicativeInvers = (a) => {
    for (let i = 0; i <= 26; i++) {
      const result = i * a
      if (result % 26 === 1) {
        return i
      }
    }
  }

})








