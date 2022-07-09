import {fontSizes} from './Font';

const palette = {
  orange: '#FD6542',
  green: '#52B86A',
  black: '#000000',
  white: '#FFFFFF',
  lightGrey: '#DFDFDE',
};

export const fontsFamily = {
  proximaNova: 'ProximaNova-Regular',
  proximaNovaBold: 'ProximaNova-Bold',
  proximaNovaSemiBold: 'ProximaNova-Semibold',
  montserrat: 'Montserrat-Regular',
  montserratBold: 'Montserrat-Bold',
  montserratSemiBold: 'Montserrat-Semibold',
};

export const theme = {
  colors: {
    background: palette.white,
    foreground: palette.black,
    primary: palette.orange,
    success: palette.green,
    lightGrey: palette.lightGrey,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 48,
  },
  breakpoints: {
    smallPhone: 0,
    phone: 321,
    tablet: 768,
  },
  fontWeight: {
    normal: '500',
    bold: 'bold',
  },
  textVariants: {
    header: {
      fontFamily: fontsFamily.proximaNovaSemiBold,
      fontSize: fontSizes.medium,
    },
    title: {
      fontFamily: fontsFamily.proximaNovaSemiBold,
      fontSize: fontSizes.normal,
    },
    body: {
      fontFamily: fontsFamily.proximaNova,
      fontSize: fontSizes.small,
    },
  },
};
