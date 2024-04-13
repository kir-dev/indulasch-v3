import styled from 'styled-components';

export const Spinner = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background:
    radial-gradient(farthest-side, #52155a 95%, #0000) 50% 1.1px/13.4px 13.4px no-repeat,
    radial-gradient(farthest-side, #0000 calc(100% - 15.7px), rgba(71, 75, 255, 0.1) 0);
  animation: spinner-aur408 1s infinite linear;

  @keyframes spinner-aur408 {
    to {
      transform: rotate(1turn);
    }
  }
`;
