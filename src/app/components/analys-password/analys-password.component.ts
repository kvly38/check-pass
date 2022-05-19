import { Element } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Console } from 'console';

import crackAnalys from './crackTime.json';


@Component({
  selector: 'app-analys-password',
  templateUrl: './analys-password.component.html',
  styleUrls: ['./analys-password.component.scss']
})
export class AnalysPasswordComponent implements OnInit {
  faCheck = faCheck;
  faXmark = faXmark;

  title: string = 'Analyse de mot de passe';

  analysStatus = false;

  crackAnalysArray = crackAnalys;

  crackAnalys_pool = {
    name: '',
    time: '',
    passwordLength: 0,
    poolOfCharactersPossible: {
      numbersOnly: {
        test: (password) => {
          let reg = new RegExp(/[0-9]/g);
          return reg.test(password);
        }
      },
      upperOrLowerCaseLetters: {
        test: (password) => {
          let reg = new RegExp(/[a-z]/g);
          let reg2 = new RegExp(/[A-Z]/g);
          return reg.test(password) || reg2.test(password);
        }
      },
      upperOrLowerCaseLettersMixed: {
        test: (password) => {
          let reg = new RegExp(/[a-z]/g);
          let reg2 = new RegExp(/[A-Z]/g);
          return reg.test(password) && reg2.test(password);
        }
      },
      numbersUpperAndLowerCaseLetters: {
        test: (password) => {
          let reg = new RegExp(/[a-z]/g);
          let reg2 = new RegExp(/[A-Z]/g);
          let reg3 = new RegExp(/[0-9]/g);
          return reg.test(password) && reg2.test(password) && reg3.test(password);
        }
      },
      numbersUpperAndLowerCaseLettersSymbol: {
        test: (password) => {
          let reg = new RegExp(/[a-z]/g);
          let reg2 = new RegExp(/[A-Z]/g);
          let reg3 = new RegExp(/[0-9]/g);
          let reg4 = new RegExp(/[^a-zA-Z0-9]/g);
          return reg.test(password) && reg2.test(password) && reg3.test(password) && reg4.test(password);
        }
      }
    }
  }

  checkPoint = {
    minCharacters: {
      text: '8 caractères',
      min: 8,
      result: false
    },
    minUppercase: {
      text: '1 majuscule',
      min: 1,
      result: false
    },
    minSpecialCharacter: {
      text: '1 caractère spécial',
      min: 1,
      result: false
    }
  }


  passwordEntropy = {
    strength: '',
    entropy: 0,
    poolOfCharactersPossible: {
      number: {
        value: 10,
        test: (password) => {
          let reg = new RegExp(/[0-9]/g);
          return reg.test(password);
        }
      },
      lowerCase: {
        value: 26,
        test: (password) => {
          let reg = new RegExp(/[a-z]/g);
          return reg.test(password);
        }
      },
      upperCase: {
        value: 26,
        test: (password) => {
          let reg = new RegExp(/[A-Z]/g);
          return reg.test(password);
        }
      },
      symbol: {
        value: 33,
        test: (password) => {
          let reg = new RegExp(/[^a-zA-Z0-9]/g);
          return reg.test(password);
        }
      }

    }
  }

  constructor() {

  }

  ngOnInit(): void {
  }

  passwordVerify(event) {
    if (event.target.value.length < 3) {
      this.analysStatus = false;
      return;
    }
    let password = event.target.value;
    this.checkPointVerify(password)
    this.passwordEntropyCalcul(password);
    this.passwordStrength(this.passwordEntropy.entropy);
    this.passwordPoolAnalys(password)
    this.analysStatus = true;
  }

  checkPointVerify(password) {
    this.checkPoint.minCharacters.result = password.length >= this.checkPoint.minCharacters.min;
    this.checkPoint.minUppercase.result = password.match(/[A-Z]/g) ? true : false;
    this.checkPoint.minSpecialCharacter.result = password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g) ? true : false;
  }

  //Password Entropy = (log2(n) * m)
  //n = nombre de caractères possibles
  //m = nombre de caractères de la chaine
  passwordEntropyCalcul(password) {
    let entropy = 0;
    let n = 0;
    let m = password.length;
    let poolOfCharactersPossible = this.passwordEntropy.poolOfCharactersPossible;

    if (poolOfCharactersPossible.number.test(password)) {
      n += poolOfCharactersPossible.number.value;
    }
    if (poolOfCharactersPossible.lowerCase.test(password)) {
      n += poolOfCharactersPossible.lowerCase.value;
    }
    if (poolOfCharactersPossible.upperCase.test(password)) {
      n += poolOfCharactersPossible.upperCase.value;
    }
    if (poolOfCharactersPossible.symbol.test(password)) {
      n += poolOfCharactersPossible.symbol.value;
    }

    entropy = Math.round(Math.log2(n) * m);

    this.passwordEntropy.entropy = entropy;

  }


  passwordStrength(entropy_value) {
    let entropy = entropy_value;
    let strength = '';
    if (entropy < 64) {
      strength = 'Very weak';
    }
    else if (entropy < 80) {
      strength = 'Weak';
    }
    else if (entropy < 112) {
      strength = 'Moderate';
    }
    else if (entropy < 128) {
      strength = 'Strong';
    }
    else {
      strength = 'Very strong';
    }
    this.passwordEntropy.strength = strength;
  }

  passwordPoolAnalys(password) {

    let poolOfCharactersPossible = this.crackAnalys_pool.poolOfCharactersPossible;

    let poolName = '';

    let passwordLength = password.length;


    if (poolOfCharactersPossible.numbersUpperAndLowerCaseLettersSymbol.test(password)) {
      poolName = 'numbersUpperAndLowerCaseLettersSymbol';
    }
    else if (poolOfCharactersPossible.numbersUpperAndLowerCaseLetters.test(password)) {
      poolName = 'numbersUpperAndLowerCaseLetters';
    }
    else if (poolOfCharactersPossible.upperOrLowerCaseLettersMixed.test(password)) {
      poolName = 'upperOrLowerCaseLettersMixed';
    }
    else if (poolOfCharactersPossible.upperOrLowerCaseLetters.test(password)) {
      poolName = 'upperOrLowerCaseLetters';
    }
    else if (poolOfCharactersPossible.numbersOnly.test(password)) {
      poolName = 'numbersOnly';
    }



    this.crackAnalysArray.forEach(element => {

        // console.log(element)
        // console.log(eval(String('element.' + poolName)))
        console.log(element.numberOfCharacters)
        console.log(passwordLength)

      if (element.numberOfCharacters == passwordLength) {
        this.crackAnalys_pool.time = eval(String('element.' + poolName));
      }
    });
  }
}
