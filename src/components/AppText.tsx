import React from 'react';
import {Text} from 'react-native';
import {useSelector} from 'react-redux';
import {Colors} from '../constants/colors';

const AppText = ({children, style, ...props}) => {
  const isDarkMode = useSelector(state => state.theme.isDarkMode);

  const defaultStyle = {color: isDarkMode ? Colors.WHITE : Colors.BLACK};

  return (
    <Text {...props} style={[style, defaultStyle]}>
      {children}
    </Text>
  );
};

export default AppText;
