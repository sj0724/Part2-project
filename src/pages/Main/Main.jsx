import { useRef } from 'react';
import { Link } from 'react-router-dom';
import mainImage from '../../assets/logo.svg';
import personIcon from '../../assets/Person.svg';
import LinkButton from '../../components/LinkButton/LinkButton';
import * as S from './Main.styled';
import fetchPostUser from '../../services/fetchPostUser';

function Main() {
  const userName = useRef('');
  const createUser = async (e) => {
    e.preventDefault();
    await fetchPostUser(userName.current.value);
    window.location.href = '/list';
  };

  return (
    <S.Body>
      <Link to="/list">
        <LinkButton>질문하러 가기</LinkButton>
      </Link>
      <S.MainLogo src={mainImage} alt="logo" />
      <S.UserForm onSubmit={createUser}>
        <S.UserInput htmlFor="name">
          <img src={personIcon} alt="userlogo" />
          <input placeholder="이름을 입력해주세요." id="name" ref={userName} />
        </S.UserInput>
        <S.UserSubmitBtn type="submit">질문 받기</S.UserSubmitBtn>
      </S.UserForm>
      <S.Background>
        <S.ImageArea />
      </S.Background>
    </S.Body>
  );
}

export default Main;
