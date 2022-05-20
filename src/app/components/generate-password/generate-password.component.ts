// Angular
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Options } from '@angular-slider/ngx-slider';
import { ChangeContext } from '@angular-slider/ngx-slider/change-context';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-generate-password',
  templateUrl: './generate-password.component.html',
  styleUrls: ['./generate-password.component.scss']
})
export class GeneratePasswordComponent implements OnInit {

  // Public
  // ============================================================================
  // Valeurs des checkbox
  showSpecials = true;
  showNumber = true;
  showLetters = true;
  defaultLong = 12;
  minLong = 4;
  maxLong = 40;

  // Formulaire de génération de mot de passe
  formGenerate: FormGroup = this.formBuild.group({
    range: new FormControl(this.defaultLong,  [
      Validators.required,
      Validators.min(this.minLong),
      Validators.max(this.maxLong)
    ]),
    letters: new FormControl(this.showLetters, [Validators.required]),
    numbers: new FormControl(this.showNumber, []),
    specials: new FormControl(this.showSpecials, []),
    password: new FormControl('', [Validators.required]),
  });

  optionSlider: Options = {
    floor: this.minLong,
    ceil: this.maxLong,
    showSelectionBar: true,
    getSelectionBarColor: (value: number): string => {
      if (value <= 8) {
        return 'red';
      }
      if (value <= 12) {
        return 'orange';
      }
      if (value <= 14) {
        return 'yellow';
      }
      return '#2AE02A';
    }
  };

  copieWord = '';
  copieWordErr = '';

  // Private
  // ============================================================================
  private letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  private numbers = '0123456789';
  private specials  = '@&$!#?^£€*µ';

  constructor(private formBuild: FormBuilder,
              private toast: ToastrService,
              public translate: TranslateService,
              private clipboardApi: ClipboardService) {

    this.translate.get([
      'PAGES.GENERATE.COPIE.SUCCESS',
      'PAGES.GENERATE.COPIE.ERROR',
    ]).subscribe((word: string[]) => {
      this.copieWord = word['PAGES.GENERATE.COPIE.SUCCESS'];
      this.copieWordErr = word['PAGES.GENERATE.COPIE.ERROR'];
    });

  }

  ngOnInit(): void {
    // Désactive-les forms
    this.formGenerate.get('password').disable();
    this.formGenerate.get('letters').disable();
  }

  // Récupère les valeurs des checkbox
  changeCheckbox(num: number, evt): void {
    switch (num) {
      case 0:
        // Letters
        this.showLetters = evt.currentTarget.checked;
        break;
      case 1:
        // Numbers
        this.showNumber = evt.currentTarget.checked;
        break;
      case 2:
        // Specials
        this.showSpecials = evt.currentTarget.checked;
        break;
    }
  }

  /**
   * Récupère la valeur de l'input Range et modifie le formControl
   *
   *  @param evt: ChangeContext
   *  @return void
   */
  changeRange(evt: ChangeContext): void {
    const range = evt.value;
    this.formGenerate.get('range').setValue(range);
    this.refreshPassword(range);
  }

  /**
   * Vérifie la présence des options checkbox
   *
   * @return string
   */
  checkOptions(): string {
    let characters = '';
    characters += this.showLetters ? this.letters : '';
    characters += this.showNumber ? this.numbers : '';
    characters += this.showSpecials ? this.specials : '';
    return characters;
  }


  /**
   * Crée un mot de passe en fonction des options sélectionner
   *
   * @param range: number
   * @return void
   */
  refreshPassword(range: number): void {
    const characters: string = this.checkOptions();
    let password = '';

    for (let i = 0; i < range; i++) {
      password += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    this.formGenerate.get('password').setValue(password);
  }

  /**
   * Permet de copier le contenu du mot de passe
   *
   *  @return void
   */
  copPass(): void {
    const pws: string = this.formGenerate.get('password').value;

    if (pws && this.clipboardApi.isSupported) {
      // Copie le contenu
      this.clipboardApi.copyFromContent(pws);
      // Toast
      this.toast.success(this.copieWord);
    } else {
      this.toast.error(this.copieWordErr);
    }
  }

  // Fix: Type AbstractControl is not assignable to type FormControl
  // Pas toucher
  toControl(absCtrl: AbstractControl): FormControl {
    return absCtrl as FormControl;
  }

}
