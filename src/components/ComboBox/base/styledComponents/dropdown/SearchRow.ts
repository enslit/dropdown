import styled from "styled-components";

const SearchRow = styled.div<{ direction: 'top' | 'bottom' }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px 16px;
  border-bottom: ${({ direction }) => direction === 'bottom' ? '1px solid rgba(0,0,0,.2)' : 'none'};
  border-top: ${({ direction }) => direction !== 'bottom' ? '1px solid rgba(0,0,0,.2)' : 'none'};

  & svg {
    fill: gray;
    stroke: gray;
    opacity: .7;
    height: 12px;
    width: 12px;
  }
`

export default SearchRow