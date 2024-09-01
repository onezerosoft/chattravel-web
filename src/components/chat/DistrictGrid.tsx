import styled from "styled-components";
import { Region } from "../../types";
import { DISTRICT_MAP } from "../../constants";
import { Dispatch, SetStateAction, useEffect } from "react";

interface DistrictGridProps {
  region: Region;
  districtBooleans: boolean[];
  setDistrictBooleans: Dispatch<SetStateAction<boolean[]>>;
}

const DistrictGrid = ({
  region,
  districtBooleans,
  setDistrictBooleans,
}: DistrictGridProps) => {
  const falseBooleans = Array(30).fill(false);
  const trueBooleans = Array(30).fill(true);

  const getIsAll = () => districtBooleans.every((x) => x == true);

  const clickDistrict = (index: number) => () => {
    districtBooleans[index] = !districtBooleans[index];
    setDistrictBooleans([...districtBooleans]);
  };

  const clickAll = () => {
    if (getIsAll()) setDistrictBooleans([...falseBooleans]);
    else setDistrictBooleans([...trueBooleans]);
  };

  useEffect(() => {
    setDistrictBooleans([...falseBooleans]);
  }, []);

  return (
    <Wrapper>
      <District onClick={clickAll} $isSelected={getIsAll()}>
        전체
      </District>
      {DISTRICT_MAP[region].map((district, index) => (
        <District
          $isSelected={districtBooleans[index]}
          onClick={clickDistrict(index)}
        >
          {district}
        </District>
      ))}
    </Wrapper>
  );
};

export default DistrictGrid;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  padding: 10px;
`;

const District = styled.button<{ $isSelected: boolean }>`
  text-align: center;
  font-weight: ${({ $isSelected }) => ($isSelected ? "600" : "400")};
  background-color: #e8e8e8;
  font-size: 14px;
  box-sizing: border-box;
  border: ${({ $isSelected }) =>
    $isSelected ? "1.5px solid black" : "1.5px solid #e8e8e8"};

  &:hover {
    transform: scale(1.05);
    opacity: 80%;
  }
`;
