import React, {FC, useEffect, useRef} from 'react';
import {Animated} from 'react-native';

export interface Skeleton {
  width: number | string;
  height: number | string;
}

const Skeleton: FC<Skeleton> = ({width, height}) => {
  const opacity = useRef(new Animated.Value(0.3));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity.current, {
          toValue: 1,
          useNativeDriver: true,
          duration: 500,
        }),
        Animated.timing(opacity.current, {
          toValue: 0,
          useNativeDriver: true,
          duration: 800,
        }),
      ]),
    ).start();
  }, [opacity]);
  
  return (
    <Animated.View
      style={{opacity: opacity.current, width, height, backgroundColor: '#eee', borderRadius: 4}}
    />
  );
};

export default Skeleton;
