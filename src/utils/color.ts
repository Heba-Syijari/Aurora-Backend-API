interface RGBType {
  r: number;
  g: number;
  b: number;
}

export class Color {
  static readonly white = '#FFFFFF';
  static readonly black = '#000000';

  static readonly commonWhite = 'common.white';
  static readonly commonBlack = 'common.black';
  static readonly primaryMain = 'primary.main';
  static readonly primaryContrastText = 'primary.contrastText';
  static readonly secondaryMain = 'secondary.main';
  static readonly secondaryContrastText = 'secondary.contrastText';
  static readonly textPrimary = 'text.primary';
  static readonly textSecondary = 'text.secondary';

  static convertHexToRGB(hex: string): RGBType {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
      hex.toLocaleLowerCase(),
    );

    if (result) {
      return {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      };
    }

    console.log(`color [${hex}] is invalid`);

    return { r: 0, g: 0, b: 0 }; // the black is the fallback color
  }

  static calculateDistance(color1: string, color2: string): number {
    const rgb1 = this.convertHexToRGB(color1);
    const rgb2 = this.convertHexToRGB(color2);

    return Math.sqrt(
      (rgb1.r - rgb2.r) ** 2 + (rgb1.g - rgb2.g) ** 2 + (rgb1.b - rgb2.b) ** 2,
    );
  }

  static getDistanceFromWhite(color: string): number {
    return this.calculateDistance(color, this.white);
  }

  static getDistanceFromBlack(color: string): number {
    return this.calculateDistance(color, this.black);
  }
}
