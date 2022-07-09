import {Dimensions, PixelRatio, Platform} from 'react-native';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const scale = SCREEN_WIDTH / 320;

export const normalize = (size: number): number => {
  const fontSize = size * scale;
  let finalFontSize = Math.round(PixelRatio.roundToNearestPixel(fontSize));

  if (Platform.OS === 'ios') {
    return finalFontSize;
  } else {
    return finalFontSize - 2;
  }
};

export const fontSizes = {
  xsmall: normalize(10),
  small: normalize(12),
  normal: normalize(14),
  medium: normalize(16),
  large: normalize(20),
  xlarge: normalize(24),
};
