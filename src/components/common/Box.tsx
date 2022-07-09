import React, { FC } from 'react';
import {View, Dimensions} from 'react-native';
import { theme } from '../../themes/Theme';

interface IBoxProps extends React.ComponentProps<typeof View> {
  padding?: keyof typeof theme.spacing;
  margin?: keyof typeof theme.spacing;
  backgroundColor?: keyof typeof theme.colors;
  borderRadius?: number;
}

type TValue = keyof typeof theme.spacing | keyof typeof theme.colors | string | undefined;

interface IResponsive {
  value: TValue;
  dimensions: {
    width: number;
    height: number;
  }
}

const getBreakpointForScreenSize = (dimensions: any) => {
  const sortedBreakpoints = Object.entries(theme.breakpoints).sort(
    (valA, valB) => {
      return valA[1] - valB[1];
    },
  );

  return sortedBreakpoints.reduce((acc, [breakpoint, minWidth]): any => {
    if (dimensions.width >= minWidth) return breakpoint;
    return acc;
  }, 0);
};

const getResponsiveValue = ({ value, dimensions }: IResponsive): TValue => {
  if (typeof value === 'object') {
    return value[getBreakpointForScreenSize(dimensions)];
  }
  return value;
};

const Box: FC<IBoxProps> = ({style, padding, margin, backgroundColor, borderRadius = 0, ...rest}) => {
  const dimensions = Dimensions.get('window');
  const marginStyle = getResponsiveValue({value: margin, dimensions});
  const paddingStyle =  getResponsiveValue({value: padding, dimensions});
  const bgColorStyle = getResponsiveValue({value: backgroundColor, dimensions});

  return (
    <View
      style={{
        margin: theme.spacing[marginStyle as keyof TValue],
        padding: theme.spacing[paddingStyle as keyof TValue],
        backgroundColor: theme.colors[bgColorStyle as keyof TValue],
        borderRadius,
        ...(typeof style === 'object' ? style : {}),
      }}
      {...rest}
    />
  );
};

export default Box;
