import styled from "styled-components";

const ComboboxValue = styled.div<{overridePadding?: string}>`
  display: flex;
  overflow-x: auto;
  align-items: center;
  gap: 5px;
  height: 100%;
  overflow-y: auto;
  border-radius: 20px 0 0 20px;
  padding: ${({ overridePadding }) => overridePadding ? overridePadding : '8px'};
`;

export default ComboboxValue