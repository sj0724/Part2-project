import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchSubject } from '../../services/fetchSubject';
import useFetchQuestionList from '../../hooks/useFetchQuestionList';
import * as S from './AnswerList.styled';
import calculateDate from '../../utils/calculateDate';
import mainLogo from '../../assets/logo.svg';
import kakaoIcon from '../../assets/Kakaotalk.svg';
import linkIcon from '../../assets/Link.svg';
import facebookIcon from '../../assets/Facebook.svg';
import MessageIcon from '../../assets/Messages.svg';
import emptyIcon from '../../assets/emptyIcon.svg';
import thumbsUp from '../../assets/thumbs-up.svg';
import thumbsUpSelect from '../../assets/thumbs-up-blue.svg';
import thumbsDown from '../../assets/thumbs-down.svg';
import thumbsDownSelect from '../../assets/thumbs-down-red.svg';

/** 작업완료 후 주석은 다 지울 예정 */
function AnswerList() {
  // user
  // {
  //     "id": 4838,
  //     "name": "test",
  //     "imageSource": "https://fastly.picsum.photos/id/311/200/200.jpg?hmac=CHiYGYQ3Xpesshw5eYWH7U0Kyl9zMTZLQuRDU4OtyH8",
  //     "questionCount": 2,
  //     "createdAt": "2024-04-09T01:12:41.641885Z"
  // }
  const { id } = useParams();
  const { data: user } = fetchSubject(id);

  // questionList
  //   {
  //     "count": 2,
  //     "next": null,
  //     "previous": null,
  //     "results": [
  //         {
  //             "id": 8257,
  //             "subjectId": 4838,
  //             "content": "테스트 질문 2",
  //             "like": 0,
  //             "dislike": 0,
  //             "createdAt": "2024-04-15T08:22:23.809788Z",
  //             "answer": null
  //         },
  //         {
  //             "id": 8160,
  //             "subjectId": 4838,
  //             "content": "테스트입니다",
  //             "like": 0,
  //             "dislike": 0,
  //             "createdAt": "2024-04-12T05:34:28.212140Z",
  //             "answer": null
  //         }
  //     ]
  // }
  const { data: list, question } = useFetchQuestionList(id);

  const getCreatedText = (createdAt) => {
    let createdText = '';

    if (createdAt) {
      const nowDate = new Date();
      const createdDate = new Date(createdAt);
      const date = (nowDate - createdDate) / 1000;
      const createdTime = calculateDate(date);
      createdText = ` ・ ${createdTime.time}${createdTime.result}전`;
    }

    return createdText;
  };

  const [like, setLike] = useState(false);
  const [disLike, setDisLike] = useState(false);

  const toggleThumbs = () => {
    if (like) {
      setLike(!like);
      setDisLike(like);
    } else if (disLike) {
      setDisLike(!disLike);
      setLike(disLike);
    }
  };

  const handleLike = () => {
    if (like) {
      setLike(!like);
      return;
    }
    setLike(!like);
    toggleThumbs();
  };

  const handleDisLike = () => {
    if (disLike) {
      setDisLike(!disLike);
      return;
    }
    setDisLike(!disLike);
    toggleThumbs();
  };

  if (!user) {
    return <div>hi</div>;
  }

  return (
    <>
      <S.Header>
        <img src={mainLogo} alt="mainLogo" />
      </S.Header>
      <S.UserInfo>
        <S.UserImage $image={user.imageSource} />
        <span>{user.name}</span>
        <S.BtnContainer>
          <S.SnsBtn $color="--Brown-40" $image={linkIcon} />
          <S.SnsBtn $color="--Yellow-50" $image={kakaoIcon} />
          <S.SnsBtn $color="--Blue-50" $image={facebookIcon} />
        </S.BtnContainer>
      </S.UserInfo>
      <S.Body>
        <S.Container>
          <S.QuestionCount>
            <img src={MessageIcon} alt="MessageIcon" />
            {list.count}개의 질문이 있습니다.
          </S.QuestionCount>
          {list.count ? (
            question.map((item, index) => (
              <S.QuestBody key={index}>
                <S.QuestionStatus $complete={item.answer}>
                  {item.answer ? '답변 완료' : '미답변'}
                </S.QuestionStatus>
                <S.QuestionContent>
                  <S.Time>
                    질문
                    {getCreatedText(item.createdAt)}
                  </S.Time>
                  <S.QuestionDetail>{item.content}</S.QuestionDetail>
                </S.QuestionContent>
                <S.AnswerContainer>
                  <S.Profile $image={user.imageSource} />
                  <S.AnswerContent>
                    <S.Answerinfo>
                      <S.QuestionDetail>{user.name}</S.QuestionDetail>
                    </S.Answerinfo>
                    <S.AnswerText
                      $bgColor="--Grayscale-20"
                      $color="--Grayscale-40"
                      placeholder="답변을 입력해주세요"></S.AnswerText>
                    <S.AnswerButton $color="--Grayscale-10" $bgColor="--Brown-30">
                      답변 완료
                    </S.AnswerButton>
                  </S.AnswerContent>
                </S.AnswerContainer>
                <S.QuestionModal>
                  <S.ThumbnsBtn onClick={handleLike} $color={like ? '--Blue-50' : null}>
                    <img src={like ? thumbsUpSelect : thumbsUp} alt="up" />
                    <span>좋아요 {item.like}</span>
                  </S.ThumbnsBtn>
                  <S.ThumbnsBtn onClick={handleDisLike} $color={disLike ? '--Red-50' : null}>
                    <img src={disLike ? thumbsDownSelect : thumbsDown} alt="down" />
                    <span>싫어요 {item.dislike}</span>
                  </S.ThumbnsBtn>
                </S.QuestionModal>
              </S.QuestBody>
            ))
          ) : (
            <S.NoQuestion src={emptyIcon} />
          )}
        </S.Container>
      </S.Body>
    </>
  );
}

export default AnswerList;
