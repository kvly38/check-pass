import { Element } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Console } from 'console';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Options } from '@angular-slider/ngx-slider';
import { ChangeContext } from '@angular-slider/ngx-slider/change-context';

// #import crackAnalys as Json
import crackAnalys from './crackTime.json';
import names from './nat2020.json';
import pays from './pays_.json';
import city from './pays_.json';
import date from './date_.json';





import { crackTime } from '../../interfaces/crackTime.interface';
// import { checkPoint } from '../../interfaces/checkPoint.interface';

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

  checkPoint = {
    minCharacters: {
      text: '',
      min: 8,
      result: false
    },
    minUppercase: {
      text: '',
      min: 1,
      result: false
    },
    minSpecialCharacter: {
      text: '',
      min: 1,
      result: false
    },
    isNameInPassword: {
      text: '',
      result: false
    },
    isPaysInPassword: {
      text: '',
      result: false
    },
    isCityInPassword: {
      text: '',
      result: false
    },
    isDateInPassword: {
      text: '',
      result: false
    },
    finalResult: {
      text: '',
      result: false
    }
  }

  passwordEntropy = {
    strength: '',
    strengthPercent : '',
    backgroundColor : '',
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
     //Pour chaque name dans le tableau affiche le dans la cnsole si il est plus petit que 4
     names.forEach(name => {
      if (name.length < 4) {
        console.log(name);
      }
    });
  }

  passwordVerify(pass): void {
    let password = '';
    this.analysStatus = false;
    // Tant que l'utilisateur n'a pas inserer plus de 3 cara
    if (pass.length < 3) {
      this.analysStatus = false;
      return;
    }
    password = pass;
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
    this.checkPoint.minCharacters.text = this.checkPoint.minCharacters.result ? 'C\'est super votre mot de passe contient au moin ' + this.checkPoint.minCharacters.min + ' caractères' : 'Trop court.. Votre mot de passe doit contenir au moin ' + this.checkPoint.minCharacters.min + ' caractères';
    this.checkPoint.minUppercase.result = this.regex.upperLetters.test(password);
    this.checkPoint.minUppercase.text = this.checkPoint.minUppercase.result ? 'La classe votre mot de passe contient au moin ' + this.checkPoint.minUppercase.min + ' majuscules' : 'Attention.. Votre mot de passe doit contenir au moin ' + this.checkPoint.minUppercase.min + ' majuscule';
    this.checkPoint.minSpecialCharacter.result = this.regex.symbol.test(password);
    this.checkPoint.minSpecialCharacter.text = this.checkPoint.minSpecialCharacter.result ? 'Votre mot de passe contient au moin ' + this.checkPoint.minSpecialCharacter.min + ' caractères spécial bravo' : 'Danger... Votre mot de passe doit contenir au moin ' + this.checkPoint.minSpecialCharacter.min + ' caractères spécial voir plusieurs !';

    if (password.length >= 4) {
      // this.checkPoint.isNameInPassword = names.some(v => password.includes(v)) ? { text: 'Votre mot de passe contient un prénom', result: true } : { text: 'Votre mot de passe ne contient pas de nom de prénom', result: false };
      this.checkPoint.isNameInPassword.result = names.some(v => password.toUpperCase().includes(v));
      this.checkPoint.isNameInPassword.text = this.checkPoint.isNameInPassword.result ? 'Votre mot de passe contient un prénom' : 'Votre mot de passe ne contient pas de nom de prénom';
      this.checkPoint.isPaysInPassword.result = pays.some(v => password.toUpperCase().includes(v));
      this.checkPoint.isPaysInPassword.text = this.checkPoint.isPaysInPassword.result ? 'Votre mot de passe contient un pays' : 'Votre mot de passe ne contient pas de pays';
      this.checkPoint.isCityInPassword.result = city.some(v => password.toUpperCase().includes(v));
      this.checkPoint.isCityInPassword.text = this.checkPoint.isCityInPassword.result ? 'Votre mot de passe contient une ville' : 'Votre mot de passe ne contient pas de ville';
      this.checkPoint.isDateInPassword.result = date.some(v => password.toUpperCase().includes(v));
      this.checkPoint.isDateInPassword.text = this.checkPoint.isDateInPassword.result ? 'Votre mot de passe contient une date' : 'Votre mot de passe ne contient pas de date';
    }
    this.checkPoint.finalResult.result = this.checkPoint.minCharacters.result && this.checkPoint.minUppercase.result && this.checkPoint.minSpecialCharacter.result && !this.checkPoint.isNameInPassword.result && !this.checkPoint.isPaysInPassword.result && !this.checkPoint.isCityInPassword.result && !this.checkPoint.isDateInPassword.result;
    this.checkPoint.finalResult.text = this.checkPoint.finalResult.result ? 'Félicitation votre mot de passe semble sécurisé' : 'Attention votre mot de passe n\'est pas sécurisé';

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

  if (entropy < 24) {
    this.passwordEntropy.strength = 'Très faible : ' + entropy + ' bits';
    this.passwordEntropy.backgroundColor = '#EB6D6D';
  }
  else if (entropy < 48) {
    this.passwordEntropy.strength = 'Faible : ' + entropy + ' bits';
    this.passwordEntropy.backgroundColor = '#F2994A';
  }
  else if (entropy < 72) {
    this.passwordEntropy.strength = 'Moyen : ' + entropy + ' bits';
    this.passwordEntropy.backgroundColor = '#F2C94C';
  }
  else if (entropy <= 128) {
    this.passwordEntropy.strength = 'Esprit complex, mot de passe complex ! ' + entropy + ' bits';
    this.passwordEntropy.backgroundColor = '#8CC152';
  }
  else if (entropy > 128) {
    this.passwordEntropy.strength = 'La force de votre mot de passe est très forte : ' + entropy + ' bits';
    this.passwordEntropy.backgroundColor = '#4CC3D9';
  }
  //Fais le pourcentage de strength sur la base 0 à 100

  this.passwordEntropy.strengthPercent = Math.round((entropy / 128) * 100) >= 100 ? '100%' :  String((entropy * 100) / 128) + '%';

  console.log(this.passwordEntropy.backgroundColor);
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
