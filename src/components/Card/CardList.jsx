import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { memo } from 'react';
import { useFetchCardList } from '../../hooks/useFetchCardList';
import Messages from '../../assets/Messages.svg';
import Paging from '../Pagination/Pagination';
import * as S from './CardList.styled';
import Loading from '../Loading/Loading';

function CardList({ limit, offset, sort }) {
  const { cards, loading, currentPage, totalPage } = useFetchCardList(limit, offset, sort);

  return (
    <S.OuterContainer>
      <S.Container>
        {loading ? (
          <Loading />
        ) : (
          cards.map((card) => (
            <S.CardContainer key={card.id}>
              <Link to={`/question/${card.id}`} style={{ textDecoration: 'none' }}>
                <S.CardWraper>
                  <S.CardImage src={card.imageSource} alt={card.name} />
                  <S.CardName>{card.name}</S.CardName>
                  <S.CardInfo>
                    <S.QuestionCountMessage>
                      <img src={Messages} alt="QuestionMessage img" />
                      <p>받은 질문</p>
                    </S.QuestionCountMessage>
                    <S.QuestionCount>{`${card.questionCount}개`}</S.QuestionCount>
                  </S.CardInfo>
                </S.CardWraper>
              </Link>
            </S.CardContainer>
          ))
        )}
      </S.Container>
      <Paging page={currentPage} total={totalPage} />
    </S.OuterContainer>
  );
}

CardList.propTypes = {
  limit: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
  sort: PropTypes.string.isRequired,
};

export default memo(CardList);
