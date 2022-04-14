import styled, {css} from 'styled-components';

//css-variable
const subColor = 'grey';
const mainColor = 'black';

//mixin css style
const shrinkLabelStyles = css`
  top: -14px;
  font-size: 12px;
  color: ${mainColor};
`;

export const FormInputLabel = styled.label`
  color: ${subColor};
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 300ms ease all;

  ${({shrink}) => shrink && shrinkLabelStyles}
`;
/*
透過導入shrink來決定是否include shrinkLabelStyles
shrink為otherProps.value.length --> 是否有輸入文字
因此若輸入>0, 則shrink>0, ===true --> include shrinkLabelStyles
*/

export const Input = styled.input`
  background: none;
  background-color: white;
  color: ${subColor};
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: 100%;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid ${subColor};
  margin: 25px 0;

  &:focus {
    outline: none;
  }

  &:focus ~ ${FormInputLabel} {
    ${shrinkLabelStyles};
  }
`;
/* 
這裡將FormInputLabel作為對象 
並apply shrinkLabelStyles進來
*/

export const Group = styled.div`
  position: relative;
  margin: 45px 0;

  input[type='password'] {
    letter-spacing: 0.3em;
  }
`;