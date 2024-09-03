import styled from "styled-components";

interface StyleSlideProps {
  title: string;
  images: string[];
  descriptions: string[];
  changeHandler: (newPreference: number) => () => void;
}

const StyleSlide = ({
  title,
  images,
  descriptions,
  changeHandler,
}: StyleSlideProps) => {
  return (
    <Wrapper>
      <h1>{title}</h1>
      <ImagesContainer>
        <img src={images[0]} />
        <img src={images[1]} />
      </ImagesContainer>
      <InputsContainer>
        <p>{descriptions[0]}</p>
        {[...Array(5)].map((_, index) => (
          <RadioGroup>
            <RadioButton
              name="radio"
              type="radio"
              onChange={changeHandler(index + 1)}
            />
            <RadioButtonLabel />
          </RadioGroup>
        ))}
        <p>{descriptions[1]}</p>
      </InputsContainer>
    </Wrapper>
  );
};

const ImagesContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 40px;

  & > img {
    width: 20vw;
    height: 45vh;
    border-radius: 20px;
    object-fit: cover;
  }
`;

const RadioButtonLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;

  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: white;
  border: 2px solid #ccc;
  transition:
    background-color 0.3s,
    border 0.3s;
`;

const RadioButton = styled.input`
  opacity: 0;
  z-index: 1;
  width: 20px;
  height: 20px;

  cursor: pointer;

  &:hover + ${RadioButtonLabel} {
    background: #b2fd0f;
  }
  &:checked + ${RadioButtonLabel} {
    background: #b2fd0f;
  }
`;

const RadioGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  position: relative;

  cursor: pointer;
`;

const InputsContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 40px;

  & > p {
    font-weight: 500;
    margin: 0 10px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 600px;
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > h1 {
    text-align: center;
    width: 100%;
    font-size: 44px;
    font-weight: 700;
  }
`;

export default StyleSlide;
