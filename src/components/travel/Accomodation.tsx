import styled from "styled-components";
import type { Place, Document } from "../../types/domain";

interface AccomodationProps {
  accomodation: Place;
  urls: Document;
  check: "Check-in" | "Check-out";
}

const Accomodation = ({ accomodation, urls, check }: AccomodationProps) => {
  return (
    <a href={urls.doc_url} target="_blank">
      <Wrapper>
        <PlaceComment>{accomodation.comment}</PlaceComment>
        <PlaceName>{check} 🛏</PlaceName>
        <PlaceNumber>{1}</PlaceNumber>
        <img src={urls.thumbnail_url} />
        <PlaceInfo>
          <h5>{accomodation.placeName} </h5>
          <p>{accomodation.address.split(" ").slice(0, 2).join(" ")}</p>
        </PlaceInfo>
      </Wrapper>
    </a>
  );
};

export default Accomodation;

const PlaceComment = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 40px;
  left: 10px;
  visibility: hidden;
  width: 160px;
  font-size: 14px;
  font-weight: 600;
  padding: 0 10px;
`;

const Wrapper = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: fit-content;
  border-radius: 20px;

  & > img {
    margin-top: 20px;
    border-radius: 20px 20px 0 0;
    width: 200px;
    height: 200px;
    object-fit: cover;
    transition: opacity 0.3s;
  }

  &:hover {
    & > img {
      opacity: 0.2;
    }

    & > p {
      opacity: 0.2;
    }

    & > div {
      visibility: visible;
      color: #222;
    }
  }
`;

const PlaceNumber = styled.span`
  width: 20px;
  height: 20px;
  position: absolute;
  top: -11px;
  color: white;
  font-size: 12px;
  font-weight: 600;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #4abb6a;
`;

const PlaceName = styled.h5`
  position: absolute;
  top: -65px;

  & > span {
    color: gray;
  }

  font-weight: 700;
  font-size: 16px;
`;

const PlaceInfo = styled.p`
  transition: opacity 0.3s; /* 부드러운 흐림 효과 */
  background-color: white;
  width: 200px;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 0 0 20px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 4px 4px 8px 1px rgb(0 0 0 / 12%);

  & > h5 {
    font-size: 14px;
    margin: 0;
    margin-bottom: 5px;
  }

  & > p {
    color: gray;
    font-size: 10px;
    text-align: end;
    width: 150px;
    align-self: end;
  }
`;
