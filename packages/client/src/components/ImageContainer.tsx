import styled from 'styled-components';

import { GlobalSize, Size } from '../utils/theme';

export const ImageContainer = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: calc(${GlobalSize.borderRadius} - ${Size.xs});
`;
