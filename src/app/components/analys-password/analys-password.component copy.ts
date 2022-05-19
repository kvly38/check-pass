import { Component, OnInit } from '@angular/core';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

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

  analysStatus: boolean;

  crackAnalys: any;

  checkPoint: {
    minCharacters: {
      text: string,
      min: number,
      result: boolean
    },
    minUppercase: {
      text: string,
      min: number,
      result: boolean
    },
    minSpecialCharacter: {
      text: string,
      min: number,
      result: boolean
    }
  }

  passwordEntropy:{
    strength: string,
    entropy: number,
    poolOfCharactersPossible:{
      numbersOnly: number,
      upperOrLowerCaseLetters: number,
      upperOrLowerCaseLettersMixed: number,
      numbersUpperAndLowerCaseLetters: number,
      numbersUpperAndLowerCaseLettersSymbol:number
    }
  }
  constructor() {
    this.analysStatus = false;
    this.crackAnalys = crackAnalys;
    this.checkPoint = {
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

    this.passwordEntropy = {
      strength: '',
      entropy: 0,
      poolOfCharactersPossible:{
        numbersOnly: 10,
        upperOrLowerCaseLetters: 26,
        upperOrLowerCaseLettersMixed: 52,
        numbersUpperAndLowerCaseLetters: 62,
        numbersUpperAndLowerCaseLettersSymbol:95
      }
    }  
    
  }

  ngOnInit(): void {
  }

  passwordVerify(event){
    if(event.target.value.length == 0){
      this.analysStatus = false;
      return;
    }
    let password = event.target.value;
    this.checkPointVerify(password)
    this.passwordEntropyCalcul(password);
    this.passwordPoolAnalys(password)
    this.analysStatus = true;
  }

  checkPointVerify(password){
    this.checkPoint.minCharacters.result = password.length >= this.checkPoint.minCharacters.min;
    this.checkPoint.minUppercase.result = password.match(/[A-Z]/g) ? true : false;
    this.checkPoint.minSpecialCharacter.result = password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g) ? true : false;
  }
  
  //Password Entropy = (log2(n) * m)
  //n = nombre de caractères possibles
  //m = nombre de caractères de la chaine
  passwordEntropyCalcul(password){
    let entropy = 0;
    let n = 0;
    let m = password.length;
    let poolOfCharactersPossible = this.passwordEntropy.poolOfCharactersPossible;
    if(password.match(/[a-z]/g)){
      n += poolOfCharactersPossible.lowercase;
    }
    if(password.match(/[A-Z]/g)){
      n += poolOfCharactersPossible.uppercase;
    }
    if(password.match(/[0-9]/g)){
      n += poolOfCharactersPossible.numeric;
    }
    if(password.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g)){
      n += poolOfCharactersPossible.specialCharacters;
    }
    entropy = Math.round(Math.log2(n) * m);

    this.passwordEntropy.entropy = entropy;

    if(entropy < 28){
      this.passwordEntropy.strength = 'Très Faible';
    }
    else if(entropy < 35){
      this.passwordEntropy.strength = 'Faible';
    }
    else if(entropy < 59){
      this.passwordEntropy.strength = 'Raisonable';
    }
    else if(entropy < 127){
      this.passwordEntropy.strength = 'Fort';
    }
    else{
      this.passwordEntropy.strength = 'Très Fort';
    }
    
  }
  // [
  //   {
  //     "numberOfCharacters": 3,
  //     "numbersOnly": "instantané",
  //     "upperOrLowerCaseLetters": "instantané",
  //     "upperOrLowerCaseLettersMixed": "instantané",
  //     "numbersUpperAndLowerCaseLetters": "instantané",
  //     "numbersUpperAndLowerCaseLettersSymbol": "instantané"
  //   },
  //   {
  //     "numberOfCharacters": 4,
  //     "numbersOnly": "instantané",
  //     "upperOrLowerCaseLetters": "instantané",
  //     "upperOrLowerCaseLettersMixed": "instantané",
  //     "numbersUpperAndLowerCaseLetters": "instantané",
  //     "numbersUpperAndLowerCaseLettersSymbol": "instantané"
  //   },
  //   {
  //     "numberOfCharacters": 5,
  //     "numbersOnly": "instantané",
  //     "upperOrLowerCaseLetters": "instantané",
  //     "upperOrLowerCaseLettersMixed": "instantané",
  //     "numbersUpperAndLowerCaseLetters": "3 secondes",
  //     "numbersUpperAndLowerCaseLettersSymbol": "10 secondes"
  //   },
  //   {
  //     "numberOfCharacters": 6,
  //     "numbersOnly": "instantané",
  //     "upperOrLowerCaseLetters": "instantané",
  //     "upperOrLowerCaseLettersMixed": "8 secondes",
  //     "numbersUpperAndLowerCaseLetters": "3 minutes",
  //     "numbersUpperAndLowerCaseLettersSymbol": "13 minutes"
  //   },
  //   {
  //     "numberOfCharacters": 7,
  //     "numbersOnly": "instantané",
  //     "upperOrLowerCaseLetters": "instantané",
  //     "upperOrLowerCaseLettersMixed": "5 minutes",
  //     "numbersUpperAndLowerCaseLetters": "3 heures",
  //     "numbersUpperAndLowerCaseLettersSymbol": "17 heures"
  //   },
  //   {
  //     "numberOfCharacters": 8,
  //     "numbersOnly": "instantané",
  //     "upperOrLowerCaseLetters": "13 minutes",
  //     "upperOrLowerCaseLettersMixed": "3 heures",
  //     "numbersUpperAndLowerCaseLetters": "10 jours",
  //     "numbersUpperAndLowerCaseLettersSymbol": "57 jours"
  //   },
  //   {
  //     "numberOfCharacters": 9,
  //     "numbersOnly": "4 secondes",
  //     "upperOrLowerCaseLetters": "6 heures",
  //     "upperOrLowerCaseLettersMixed": "4 jours",
  //     "numbersUpperAndLowerCaseLetters": "1 ans",
  //     "numbersUpperAndLowerCaseLettersSymbol": "12 ans"
  //   },
  //   {
  //     "numberOfCharacters": 10,
  //     "numbersOnly": "40 secondes",
  //     "upperOrLowerCaseLetters": "6 jours",
  //     "upperOrLowerCaseLettersMixed": "169 jours",
  //     "numbersUpperAndLowerCaseLetters": "106 ans",
  //     "numbersUpperAndLowerCaseLettersSymbol": "928 ans"
  //   },
  //   {
  //     "numberOfCharacters": 11,
  //     "numbersOnly": "6 minutes",
  //     "upperOrLowerCaseLetters": "169 jours",
  //     "upperOrLowerCaseLettersMixed": "16 ans",
  //     "numbersUpperAndLowerCaseLetters": "6000 ans",
  //     "numbersUpperAndLowerCaseLettersSymbol": "71 000 ans"
  //   },
  //   {
  //     "numberOfCharacters": 12,
  //     "numbersOnly": "1 heure",
  //     "upperOrLowerCaseLetters": "12 ans",
  //     "upperOrLowerCaseLettersMixed": "600 ans",
  //     "numbersUpperAndLowerCaseLetters": "108 000 ans",
  //     "numbersUpperAndLowerCaseLettersSymbol": "5 millions d'années"
  //   },
  //   {
  //     "numberOfCharacters": 13,
  //     "numbersOnly": "11 heures",
  //     "upperOrLowerCaseLetters": "314 ans",
  //     "upperOrLowerCaseLettersMixed": "21 000 années",
  //     "numbersUpperAndLowerCaseLetters": "25 millions d'années",
  //     "numbersUpperAndLowerCaseLettersSymbol": "423 millions d'annés"
  //   },
  //   {
  //     "numberOfCharacters": 14,
  //     "numbersOnly": "4 jours",
  //     "upperOrLowerCaseLetters": "8000 ans",
  //     "upperOrLowerCaseLettersMixed": "778 000 années",
  //     "numbersUpperAndLowerCaseLetters": "1 billions d'années",
  //     "numbersUpperAndLowerCaseLettersSymbol": "5 billions d'années"
  //   },
  //   {
  //     "numberOfCharacters": 15,
  //     "numbersOnly": "46 jours",
  //     "upperOrLowerCaseLetters": "212 000 ans",
  //     "upperOrLowerCaseLettersMixed": "28 millions d'années",
  //     "numbersUpperAndLowerCaseLetters": "97 billions d'années",
  //     "numbersUpperAndLowerCaseLettersSymbol": "2 trillions d'années"
  //   },
  //   {
  //     "numberOfCharacters": 16,
  //     "numbersOnly": "1 année",
  //     "upperOrLowerCaseLetters": "512 millions d'années",
  //     "upperOrLowerCaseLettersMixed": "1 billions d'années",
  //     "numbersUpperAndLowerCaseLetters": "6 trillons d'années",
  //     "numbersUpperAndLowerCaseLettersSymbol": "193 trillons d'années"
  //   },
  //   {
  //     "numberOfCharacters": 17,
  //     "numbersOnly": "12 ans",
  //     "upperOrLowerCaseLetters": "143 millions d'années",
  //     "upperOrLowerCaseLettersMixed": "36 billions d'années",
  //     "numbersUpperAndLowerCaseLetters": "374 trillions d'années",
  //     "numbersUpperAndLowerCaseLettersSymbol": "14 qd d'années"
  //   },
  //   {
  //     "numberOfCharacters": 18,
  //     "numbersOnly": "126 ans",
  //     "upperOrLowerCaseLetters": "3 billions d'années",
  //     "upperOrLowerCaseLettersMixed": "1 trillions d'années",
  //     "numbersUpperAndLowerCaseLetters": "23qd d'année",
  //     "numbersUpperAndLowerCaseLettersSymbol": "1 qt d'années"
  //   }
  // ]
  passwordAnalysByLengthByPoolName(password){

  }
}
