import styled from "styled-components";
import { Region } from "../../types/domain";
import {
  DISTRICT_MAP,
  IMPOSSIBLE_DISTRICTS,
  POPULAR_DISTRICTS,
} from "../../constants";
import { Dispatch, SetStateAction } from "react";

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
  const getIsAll = districtBooleans.every((x) => x == true);

  const clickDistrict = (index: number) => () => {
    districtBooleans[index] = !districtBooleans[index];
    setDistrictBooleans([...districtBooleans]);
  };

  const clickAll = () => {
    if (getIsAll) setDistrictBooleans([...falseBooleans]);
    else setDistrictBooleans([...trueBooleans]);
  };

  return (
    <Wrapper>
      <District onClick={clickAll} $isSelected={getIsAll}>
        전체
      </District>
      {DISTRICT_MAP[region].map((district, index) => (
        <District
          key={district}
          $isSelected={districtBooleans[index]}
          onClick={clickDistrict(index)}
          disabled={IMPOSSIBLE_DISTRICTS.includes(district)}
        >
          {district}
          <PopularBadge $isPopular={POPULAR_DISTRICTS.includes(district)}>
            HOT
          </PopularBadge>
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

  position: relative;

  &:hover {
    transform: scale(1.05);
    opacity: 80%;
  }

  &:disabled {
    display: none;
  }
`;

const PopularBadge = styled.span<{ $isPopular: boolean }>`
  visibility: ${({ $isPopular }) => ($isPopular ? "visible" : "hidden")};
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: -2px;
  right: 5px;
  width: 24px;
  height: 11px;
  background-color: #f2ffd6;
  border-radius: 0 0 2px 2px;
  font-size: 8px;
  font-weight: 500;
  color: #212121;
`;
