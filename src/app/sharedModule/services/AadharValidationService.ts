import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AadharValidationService {
    private D = [
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
      [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
      [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
      [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
      [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
      [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
      [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
      [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
      [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
    ];
  
    private P = [
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
      [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
      [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
      [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
      [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
      [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
      [7, 0, 4, 6, 9, 1, 3, 2, 5, 8],
    ];
  
    //private INV = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  
    constructor() {}
  
    private verhoeffCheck(num: string): boolean {
      // //const numArr = num.split('').map(Number);
      // const numArr = num.split('').reverse();
  
      // let c = 0;
  
      // numArr.forEach((digit, i) => {
      //   c = this.D[c][this.P[i % 8][parseInt(digit, 10)]];
      // });
  
      // // Traverse the number from right to left
      // // for (let i = numArr.length - 1; i >= 0; i--) {
      // //   c = this.D[c][this.P[(i % 8)][parseInt(numArr, 10)]];
      // // }
  
      // // If the checksum value is 0, the number is valid
      // return c === 0;
  
      let c = 0;
  
      if (!/^\d+$/.test(num)) {
        return c === 1;
      }
  
      if (num.length != 12) {
        return c === 1;
      }
  
      const numArr = num.split('').reverse();
  
      numArr.forEach((digit, i) => {
        c = this.D[c][this.P[i % 8][parseInt(digit, 10)]];
      });
  
      return c === 0;
    }
  
    validateAadhar(aadhar: string): boolean {
        debugger;
      // Ensure the Aadhar number is exactly 12 digits long
      // if (aadhar.length !== 12 || isNaN(Number(aadhar))) {
      //   return false; // Invalid if not 12 digits
      // }
  
      // Run the Verhoeff checksum to validate
      return this.verhoeffCheck(aadhar);
    }
  }