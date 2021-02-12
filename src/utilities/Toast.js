import {  Toast } from 'native-base';

export const toast = ({text,position,duration, type,textStyle, buttonStyle}) => {
    Toast.show({
        text: text,
        position:position,
        duration:duration,
        type:type,
        textStyle:textStyle,
        buttonStyle:buttonStyle,
        buttonText: 'Okay'
      })
}