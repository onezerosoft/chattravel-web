import { useState } from "react";
import { DISTRICT_MAP, REGION_MAP } from "../../constants";
import { useChatStore, useTravelStore } from "../../stores";
import { Region } from "../../types/domain";
import Button from "../common/Button";
import ChatGroup from "./ChatGroup";
import DistrictGrid from "./DistrictGrid";
import styled from "styled-components";

interface DistrictsProps {
  region: Region;
}
const Districts = ({ region }: DistrictsProps) => {
  const [districtBooleans, setDistrictBooleans] = useState(
    Array(30).fill(false)
  );

  const step = useChatStore((state) => state.step);
  const next = useChatStore((state) => state.next);

  const setDistricts = useTravelStore((state) => state.setDistricts);

  const clickDone = () => {
    if (step !== 2) return;
    if (region == null) return;
    if (districtBooleans.every((x) => x == false)) return;

    const selectedDistricts = DISTRICT_MAP[region].filter(
      (_, index) => districtBooleans[index]
    );
    const newDistricts = districtBooleans.every((x) => x == true)
      ? ["전체"]
      : selectedDistricts;

    setDistricts(newDistricts);
    next();
  };

  return (
    <>
      <ChatGroup who={"user"} groupKey={"districts1"}>
        <p>{REGION_MAP[region]}로 떠나.</p>
      </ChatGroup>
      <ChatGroup
        who={"chet"}
        groupKey={"districts2"}
        texts={[
          `${REGION_MAP[region]}에서 특별히 여행하고 싶은 지역이 있다면 선택해줘!`,
        ]}
      />
      <DistrictGridWrapper>
        <DistrictGrid
          key={"districtGrid"}
          region={region}
          districtBooleans={districtBooleans}
          setDistrictBooleans={setDistrictBooleans}
        />
      </DistrictGridWrapper>
      <ChatGroup who="user" groupKey={"districts3"}>
        <Button design="secondary" onClick={clickDone}>
          다 골랐어요
        </Button>
      </ChatGroup>
    </>
  );
};

export default Districts;

const DistrictGridWrapper = styled.div`
  background-color: #f5f5f5;
  border-radius: 20px;

  padding: 10px 15px;
  font-weight: 500;
  text-align: start;
  width: max-content;
  margin-left: 115px;
  margin-top: -15px;

  gap: 10px;
  max-width: 450px;
`;
