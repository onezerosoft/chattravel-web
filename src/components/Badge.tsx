import styled from "styled-components";

interface BadgeProps {
  text: string;
}
const Badge = ({ text }: BadgeProps) => {
  return <Wrapper>{text}</Wrapper>;
};

export default Badge;

const Wrapper = styled.div`
  padding: 0 10px;
  height: 26px;
  background-color: #deff97;
  color: #232323;
  text-align: center;
  line-height: 26px;
  border-radius: 30px;
  font-size: 12px;
`;
