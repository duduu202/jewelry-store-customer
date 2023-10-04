import styled from "styled-components";

export const PageContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.grayBackground};
`;

export const SideDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
export const CouponSection = styled.section`
  width: fit-content;
  margin-bottom: 1rem;
  margin-top: 1rem;
`;
export const Coupons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 3rem;
  gap: 0.2rem 0;
  width: 100%;
  border: 1px solid ${(props) => props.theme.colors.dark_font};
  border-radius: 0.5rem;
  overflow: hidden;
`;
export const CoupomCell = styled.div`
  padding: 0.5rem;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
`;
export const CoupomHead = styled.div`
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.white};
  padding: 0.5rem;
  text-align: center;
`;
export const ButtonIcon = styled.button.attrs({
  type: "button",
})`
  border: none;
  background-color: transparent;
  font-size: 1.2rem;
`;
export const InputWrapper = styled.form`
  display: grid;
  grid-template-columns: 15rem 10rem;
  gap: 1rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
`;
export const Button = styled.button`
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.white};
  padding: 0.5rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  height: 2.5rem;

  transition: filter 0.2s;
  &:hover {
    filter: brightness(0.9);
  }
`;
