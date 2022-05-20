import { Element } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Console } from 'console';

import crackAnalys from './crackTime.json';

import { crackTime } from '../../interfaces/crackTime.interface';
import { checkPoint } from '../../interfaces/checkPoint.interface';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-analys-password',
  templateUrl: './analys-password.component.html',
  styleUrls: ['./analys-password.component.scss']
})
export class AnalysPasswordComponent implements OnInit {
  faCheck = faCheck;
  faXmark = faXmark;

  // Todo ajouter traduction
  title: string = 'Analyse de mot de passe';

  // ==========================================================
  analysStatus = false;
  crackAnalysArray: crackTime[] = crackAnalys;

  regex: {
    lowerLetters: RegExp,
    upperLetters: RegExp,
    numbers: RegExp,
    symbol: RegExp,
  } = {
      lowerLetters: new RegExp(/[a-z]/),
      upperLetters: new RegExp(/[A-Z]/),
      numbers: new RegExp(/[0-9]/),
      symbol: new RegExp(/[^a-zA-Z0-9]/),
    }

  crackAnalysTime = '';

  checkPoint: checkPoint = {
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
        value: 10
      },
      lowerCase: {
        value: 26
      },
      upperCase: {
        value: 26
      },
      symbol: {
        value: 33
      }
    }
  }

  translateWords: string[] = [];

  constructor(public translate: TranslateService) {
    this.translate.get([
      'PAGES.ANALYS.TITLE',
      'PAGES.ANALYS.GO_TO_DETAIL',
      'PAGES.ANALYS.GO_TO_HOME'
    ]).subscribe((words: string[]) => {
      this.translateWords = words;
    });
  }

  ngOnInit(): void {

  }

  passwordVerify(event): void {
    let password = '';
    this.analysStatus = false;
    // Tant que l'utilisateur n'a pas inserer plus de 3 cara
    if (event && event.target && event.target.value && event.target.value.length < 3) {
      this.analysStatus = false;
      return;
    }

    password = event.target.value;
    this.analysStatus = this.checkPassword(password);

  }

  checkPassword(password: string): boolean {
    let result = true;

    this.checkPointVerify(password)
    this.passwordEntropyCalcul(password);
    this.passwordStrength(this.passwordEntropy.entropy);
    this.passwordPoolAnalys(password)

    return result;
  }

  checkPointVerify(password) {
    this.checkPoint.minCharacters.result = password.length >= this.checkPoint.minCharacters.min;
    this.checkPoint.minUppercase.result = this.regex.upperLetters.test(password);
    this.checkPoint.minSpecialCharacter.result = this.regex.symbol.test(password);
  }

  //Password Entropy = (log2(n) * m)
  //n = nombre de caractères possibles
  //m = nombre de caractères de la chaine
  passwordEntropyCalcul(password) {
    let entropy = 0;
    let n = 0;
    let m = password.length;
    let poolOfCharactersPossible = this.passwordEntropy.poolOfCharactersPossible;

    if (this.regex.numbers.test(password)) {
      n += poolOfCharactersPossible.number.value;
    }
    if (this.regex.lowerLetters.test(password)) {
      n += poolOfCharactersPossible.lowerCase.value;
    }
    if (this.regex.upperLetters.test(password)) {
      n += poolOfCharactersPossible.upperCase.value;
    }
    if (this.regex.symbol.test(password)) {
      n += poolOfCharactersPossible.symbol.value;
    }

    entropy = Math.round(Math.log2(n) * m);

    this.passwordEntropy.entropy = entropy;

  }

  passwordStrength(entropy) {
    let strength = '';

    if (entropy < 64) {
      this.passwordEntropy.strength = 'Very weak';
    }
    else if (entropy < 80) {
      this.passwordEntropy.strength = 'Weak';
    }
    else if (entropy < 112) {
      this.passwordEntropy.strength = 'Moderate';
    }
    else if (entropy < 128) {
      this.passwordEntropy.strength = 'Strong';
    }
    else if (entropy >= 129) {
      this.passwordEntropy.strength = 'Very strong';
    }
  }

  passwordPoolAnalys(password) {

    let poolName = '';

    let passwordLength = password.length;

    if (this.regexUpperAndLowerLettersSymbol(password)) {
      poolName = 'numbersUpperAndLowerCaseLettersSymbol';
    } else if (this.regexUpperAndLowerLetters(password)) {
      poolName = 'numbersUpperAndLowerCaseLetters';
    } else if (this.regexMixedLetters(password)) {
      poolName = 'upperOrLowerCaseLettersMixed';
    } else if (this.regexLowerOrUpperLetters(password)) {
      poolName = 'upperOrLowerCaseLetters';
    } else if (this.regexNumber(password)) {
      poolName = 'numbersOnly';
    }


    this.crackAnalysArray.forEach(element => {
      if (poolName === '') {
        this.crackAnalysTime = 'Inconnu'
      }
      else if (element.numberOfCharacters == passwordLength) {
        this.crackAnalysTime = eval(String('element.' + poolName));
        // this.crackAnalys_pool.time = eval(String('element.' + poolName));
      }
    });
  }

  regexNumber(password: string): boolean {
    return this.regex.lowerLetters.test(password);
  }

  regexLowerOrUpperLetters(password): boolean {
    return this.regex.lowerLetters.test(password) || this.regex.upperLetters.test(password);
  }

  regexMixedLetters(password): boolean {
    return this.regex.lowerLetters.test(password) && this.regex.upperLetters.test(password);
  }

  regexUpperAndLowerLetters(password): boolean {
    return this.regex.lowerLetters.test(password) && this.regex.upperLetters.test(password) && this.regex.numbers.test(password);
  }

  regexUpperAndLowerLettersSymbol(password): boolean {
    return this.regex.lowerLetters.test(password) && this.regex.upperLetters.test(password) &&
      this.regex.numbers.test(password) && this.regex.symbol.test(password);
  }


}
