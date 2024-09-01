import React, { Dispatch, PropsWithChildren, SetStateAction } from "react";
import styled from "styled-components";
import { ChetSVG } from "../../assets";
import type { ChatKind, Chat, Region } from "../../types";
import Map from "./Map";
import Button from "../common/Button";
import DistrictGrid from "./DistrictGrid";

interface ChatGroupProps extends Chat {
  region: Region;
  districtBooleans: boolean[];
  setDistrictBooleans: Dispatch<SetStateAction<boolean[]>>;
  mapHandler: (event: React.SyntheticEvent<SVGPathElement>) => void;
  firstButtonHandler: () => void;
}

function ChatGroup({
  who,
  kinds,
  region,
  districtBooleans,
  mapHandler,
  setDistrictBooleans,
  firstButtonHandler,
}: ChatGroupProps & PropsWithChildren) {
  if (who == "user")
    return (
      <UserWrapper>
        <ChatBoxContainer>
          {kinds.map((kind) => (
            <ChatBox type={who}>{kind.text}</ChatBox>
          ))}
        </ChatBoxContainer>
      </UserWrapper>
    );

  return (
    <ChetWrapper>
      <ChetSVG height={100} />
      <ChatBoxContainer>
        {kinds.map((kind: ChatKind) => {
          let content;
          switch (kind.case) {
            case 0:
              content = kind.text;
              break;
            case 1:
              content = <Map handleClick={mapHandler} />;
              break;
            case 2:
              content = (
                <DistrictGrid
                  region={region}
                  districtBooleans={districtBooleans}
                  setDistrictBooleans={setDistrictBooleans}
                />
              );
              break;
            case 3:
              content = (
                <Button onClick={firstButtonHandler}>{kind.text}</Button>
              );
              break;
            default:
              content = <Button>{kind.text}</Button>;
              break;
          }
          return <ChatBox type={who}>{content}</ChatBox>;
        })}
      </ChatBoxContainer>
    </ChetWrapper>
  );
}

export default ChatGroup;

const ChetWrapper = styled.li`
  display: flex;

  @media screen and (width <= 500px) {
    & > svg {
      width: 100px;
      height: 100px;
    }
  }
`;

const UserWrapper = styled.li`
  align-self: flex-end;
  margin-left: 20px;
  margin-right: 30px;
`;

const ChatBox = styled.div<{ type: "chet" | "user" }>`
  background-color: ${({ type }) => (type == "chet" ? "#f5f5f5" : "#3B3B3B")};
  color: ${({ type }) => (type == "chet" ? "black" : "white")};
  border-radius: 20px;
  padding: 10px 15px;
  font-weight: 500;
  text-align: start;
  width: max-content;
  white-space: break-spaces;
`;

const ChatBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;
`;
