import React, {FC} from 'react';
import {Text as TextView} from 'react-native';
import {theme} from '../../themes/Theme';

interface ITextProps extends React.ComponentProps<typeof TextView> {
  variant?: keyof typeof theme.textVariants;
  color?: keyof typeof theme.colors;
}

const Text: FC<ITextProps> = ({
  style,
  variant = 'body',
  color = 'foreground',
  ...rest
}) => {
  return (
    <TextView
      style={{
        color: theme.colors[color],
        ...theme.textVariants[variant],
        ...(typeof style === 'object' ? style : {}),
      }}
      {...rest}
    />
  );
};

export default Text;
