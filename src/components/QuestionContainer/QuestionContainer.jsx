import styled from "styled-components";
import MessageIcon from "../../assets/Messages.svg";

const Container = styled.div`
  display: inline-flex;
  padding: 16px;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  border-radius: 16px;
  border: 1px solid var(--Brown-30);
  background: var(--Brown-10);
`;

const QuestionCount = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--Brown-40);
  font-feature-settings: "clig" off, "liga" off;
  font-family: Pretendard-Regular;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 25px; /* 125% */
`;

function QuestionContainer({ children }) {
  return (
    <Container>
      <QuestionCount>
        <img src={MessageIcon} />
        n개의 질문이 있습니다.
      </QuestionCount>
      {children}
    </Container>
  );
}

export default QuestionContainer;
