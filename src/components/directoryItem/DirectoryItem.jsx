import {
  BackgroundImage,
  Body,
  DirectoryItemComtainer
} from './DirectoryItem.styled';

import { useNavigate } from 'react-router-dom';

const DirectoryItem = ({title, imageUrl, route}) => {

  //1.將navigate功能匯入
  const navigate = useNavigate();

  //2.將route放入navigate的onClick
  const onNavigateHandler = () => navigate(route);


  return(
    <DirectoryItemComtainer>
      <BackgroundImage
      onClick={onNavigateHandler}
      //將imageUrl以props傳入
      //之後在styled.jsx內可以以外來compo形式傳入
      imageUrl={imageUrl}
      />  {/* 這個用來放category背景照 */}
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemComtainer>  
  )
}

export default DirectoryItem;