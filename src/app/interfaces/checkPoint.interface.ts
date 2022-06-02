export interface checkPoint {
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
      finalResult: {
        text: string,
        result: boolean
      }
}