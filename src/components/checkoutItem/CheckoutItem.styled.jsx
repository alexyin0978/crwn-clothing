import styled, {css} from 'styled-components';

export const CheckoutItemContainer = styled.div`
  width: 100%;
  display: flex;
  min-height: 100px;
  border-bottom: 1px solid darkgrey;
  padding: 15px 0;
  font-size: 20px;
  align-items: center;
`;

export const ImageContainer = styled.div`
  width: 23%;
  padding-right: 15px;

  img {
    width: 100%;
    height: 100%;
  }
`;

//重複的prop用在不同tag -> 這裡使用css-component
//1.使用css-var
//2.或是使用css-component
const Width = css`
  width: 23%;
`;
export const Name = styled.span`${Width}`;
export const Price = styled.span`${Width}`;
export const Quantity = styled.span`
${Width};
display: flex;
`;

export const Arrow = styled.div`
  cursor: pointer;
`;

export const Value = styled.span`
  margin: 0 10px;
`;

export const RemoveButton = styled.div`
  padding-left: 12px;
  cursor: pointer;
`;