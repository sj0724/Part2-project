import styled from 'styled-components';

const StyledPagination = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 7rem;

  ul.pagination {
    display: flex;
    text-align: center;
    list-style: none;
    padding: 0;
  }

  ul.pagination li {
    cursor: pointer;
    width: 4rem;
    height: 4rem;
    border: none;
    font-size: 2rem;
    font-weight: 400;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    transition: 0.2s ease;
    background-color: var(--Grayscale-20);

    &: hover {
      background-color: var(--Grayscale-30);
    }
  }

  ul.pagination li a {
    text-decoration: none;
    color: var(--Grayscale-40);
  }

  ul.pagination li.active a {
    font-weight: 600;
    color: var(--Grayscale-50);
  }
`;

export default StyledPagination;
