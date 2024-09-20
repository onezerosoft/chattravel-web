import { createFileRoute } from "@tanstack/react-router";
import PageTemplate from "../components/common/PageTemplate";

export const Route = createFileRoute("/info")({
  component: () => <div>Hello /info!</div>,
});

function Info() {
  return (
    <PageTemplate pageName="Info" badgeText="Select details!"></PageTemplate>
  );
}

export default Info;

// import Header from "@components/Header";
// import { useState } from "react";
// import useBoolean from "../hooks/useBoolean";
// import styled from "styled-components";

// const TERMS = ["1시간", "2시간", "3시간", "4시간", "5시간", "6시간", "7시간"];

// const ParkingLotFilterCondition = () => {
//   const outside = useBoolean();
//   const road = useBoolean();
//   const mechanical = useBoolean();
//   const publicParkingLot = useBoolean();
//   const privateParkingLot = useBoolean();
//   const charged = useBoolean();
//   const free = useBoolean();
//   const account = useBoolean();
//   const cash = useBoolean();
//   const card = useBoolean();
//   const distance = useBoolean();
//   const price = useBoolean();
//   const recommend = useBoolean();

//   return (
//     <Wrapper>
//       <Header />
//       <Title>
//         <h1>주차장 조건설정</h1>
//         <p>선호하는 주차장 유형을 알려주세요!</p>
//       </Title>
//       <Line $height="7px" />
//       <ConditionList>
//         <ConditionContainer>
//           <h2>주차장 유형</h2>
//           <p>원하시는 주차장을 선택해주세요!</p>
//           <FilterContainer>
//             <FilterButton
//               $width="81px"
//               $checked={outside.value}
//               onClick={outside.toggle}
//             >
//               노외
//             </FilterButton>
//             <FilterButton
//               $width="81px"
//               $checked={road.value}
//               onClick={road.toggle}
//             >
//               노상
//             </FilterButton>
//             <FilterButton
//               $width="81px"
//               $checked={mechanical.value}
//               onClick={mechanical.toggle}
//             >
//               기계식
//             </FilterButton>
//           </FilterContainer>
//         </ConditionContainer>
//         <Line $height="2px" />
//         <ConditionContainer>
//           <h2>주차장 옵션</h2>
//           <p>원하시는 주차장을 선택해주세요!</p>
//           <FilterContainer>
//             <FilterButton
//               $width="155px"
//               $checked={publicParkingLot.value}
//               onClick={publicParkingLot.toggle}
//             >
//               공영
//             </FilterButton>
//             <FilterButton
//               $width="155px"
//               $checked={privateParkingLot.value}
//               onClick={privateParkingLot.toggle}
//             >
//               민영
//             </FilterButton>
//           </FilterContainer>
//         </ConditionContainer>
//         <Line $height="2px" />
//         <ConditionContainer>
//           <h2>주차장 결제 유형</h2>
//           <p>원하시는 주차장 결제 유형을 골라주세요!</p>
//           <FilterContainer>
//             <FilterButton
//               $width="155px"
//               $checked={charged.value}
//               onClick={charged.toggle}
//             >
//               유료
//             </FilterButton>
//             <FilterButton
//               $width="155px"
//               $checked={free.value}
//               onClick={free.toggle}
//             >
//               무료
//             </FilterButton>
//           </FilterContainer>
//         </ConditionContainer>
//         <Line $height="2px" />
//         <ConditionContainer>
//           <h2>결제 방식</h2>
//           <p>유료를 선택하셨다면, 선호하는 결제방식을 골라주세요!</p>
//           <FilterContainer>
//             <FilterButton
//               $width="81px"
//               $checked={account.value}
//               onClick={account.toggle}
//             >
//               계좌
//             </FilterButton>
//             <FilterButton
//               $width="81px"
//               $checked={cash.value}
//               onClick={cash.toggle}
//             >
//               현금
//             </FilterButton>
//             <FilterButton
//               $width="81px"
//               $checked={card.value}
//               onClick={card.toggle}
//             >
//               카드
//             </FilterButton>
//           </FilterContainer>
//         </ConditionContainer>
//         <Line $height="2px" />
//         <ConditionContainer>
//           <h2>우선순위 주차장</h2>
//           <p>우선 순위로 보고 싶은 주차장을 골라주세요! (중복 선택 불가)</p>
//           <FilterContainer>
//             <FilterButton
//               $width="81px"
//               $checked={distance.value}
//               onClick={distance.toggle}
//             >
//               가까운 순
//             </FilterButton>
//             <FilterButton
//               $width="81px"
//               $checked={price.value}
//               onClick={price.toggle}
//             >
//               가격순
//             </FilterButton>
//             <FilterButton
//               $width="81px"
//               $checked={recommend.value}
//               onClick={recommend.toggle}
//             >
//               추천순
//             </FilterButton>
//           </FilterContainer>
//         </ConditionContainer>
//         <SaveButton>저장하기</SaveButton>
//       </ConditionList>
//     </Wrapper>
//   );
// };

// const SaveButton = styled.button`
//   width: 90%;
//   padding: 0.6em 1.2em;
//   margin-top: 20px;
//   margin-bottom: 100px;

//   background: #bdc4cb;
//   border-radius: 10px;

//   color: white;
//   font-size: 20px;
//   font-weight: 700;
//   font-family: inherit;
// `;

// const Wrapper = styled.div`
//   width: 100%;
//   height: 100vh;
// `;

// const Title = styled.div`
//   text-align: start;
//   padding: 10px 0 20px 20px;

//   & > h1 {
//     font-size: 20px;
//     font-weight: bold;
//   }

//   & > p {
//     margin-top: 10px;
//   }
// `;

// const Line = styled.div<{ $height: string }>`
//   width: 100%;
//   height: ${({ $height }) => $height};

//   background-color: #f6f6f6;
// `;

// const ConditionList = styled.section`
//   height: calc(100% - 184px);
//   overflow: scroll;
// `;

// const ConditionContainer = styled.section`
//   text-align: start;
//   padding: 20px;

//   & > h2 {
//     font-size: 16px;
//     font-weight: 600;
//   }

//   & > p {
//     margin-top: 5px;

//     color: #bdc4cb;
//   }
// `;

// const FilterContainer = styled.div`
//   display: flex;
//   width: 100%;
//   margin-top: 16px;
//   justify-content: space-between;
// `;

// const FilterButton = styled.button<{ $width: string; $checked?: boolean }>`
//   display: flex;
//   width: ${(props) => props.$width};
//   height: 35px;
//   padding: 0;
//   justify-content: center;
//   align-items: center;

//   background-color: ${(props) => (props.$checked ? "#D9D9D9" : "white")};
//   border: solid 1px #bdc4cb;
//   border-radius: 20px;

//   color: ${(props) => (props.$checked ? "white" : "#bdc4cb")};
//   gap: 5px;

//   & > svg > * {
//     stroke: ${(props) => (props.$checked ? "white" : "#bdc4cb")};
//   }
// `;

// const ElectricCar = styled.div`
//   display: flex;
//   padding-top: 20px;
//   justify-content: space-between;

//   & > h3 {
//     font-size: 16px;
//     font-weight: 400;
//   }
// `;

// export default ParkingLotFilterCondition;
