import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'password-analyzer';
  notLessThan8: boolean = false;
  isNotEmpty: boolean = false;
  isEasy: boolean = false;
  isMedium: boolean = false;
  isStrong: boolean = false;
  input: string = '';

  setPasswordStatus(str: string): void {
    if (str) {
      this.isNotEmpty = true;
      this.notLessThan8 = /(?=.{8,})/.test(str);
      this.isEasy =
        (/(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])/.test(str) ||
          /(?=\D*\d)/.test(str) ||
          /(?=[^!#%]*[!#%])/.test(str)) &&
        this.notLessThan8;
      this.isMedium =
        (/(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=[^!#%]*[!#%])/.test(str) ||
          /(?=[^!#%]*[!#%])(?=\D*\d)/.test(str) ||
          /(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=\D*\d)/.test(str)) &&
        this.notLessThan8;
      this.isStrong =
        /^(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=\D*\d)(?=[^!#%]*[!#%])[A-Za-z0-9!#%]{8,32}$/.test(
          str
        );
    } else {
      this.isNotEmpty = false;
    }
    console.log(str);
  }

  setFirstIndicator(str: string): string {
    if (this.isStrong) return `strong-${str}`;
    if (this.isMedium) return `medium-${str}`;
    // if (this.isEasy) return `easy-${str}`;
    if (this.isNotEmpty) return `easy-${str}`;
    if (!this.isNotEmpty) return `not-active-${str}`;
    return `not-active-${str}`;
  }

  setSecondIndicator(str: string): string {
    if (this.isStrong) return `strong-${str}`;
    if (this.isMedium) return `medium-${str}`;
    if (this.isEasy) return `not-active-${str}`;
    if (this.isNotEmpty) return `easy-${str}`;
    if (!this.isNotEmpty) return `not-active-${str}`;
    return `not-active-${str}`;
  }

  setThirdIndicator(str: string): string {
    if (this.isStrong) return `strong-${str}`;
    if (!this.isNotEmpty) return `not-active-${str}`;
    if (this.notLessThan8) return `not-active-${str}`;
    if (this.isNotEmpty) return `easy-${str}`;
    return `not-active-${str}`;
  }

  messageAnalyzer(): string {
    if (this.isStrong) return `Strong password`;
    if (this.isMedium) return `Good password`;
    if (this.isEasy) return `Password is too weak!`;
    if (this.isNotEmpty) return `Less than 8 characters!`;
    return 'Enter password';
  }
}
