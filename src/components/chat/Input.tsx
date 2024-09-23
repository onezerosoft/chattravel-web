import { ChangeEvent, FormEvent, useRef, useState } from "react";
import styled from "styled-components";
import { ArrowRightSVG } from "../../assets";
import usePostUserMessage from "../../hooks/usePostUserMessage";
import { useChatStore } from "../../stores";

const Input = () => {
  const chatId = useChatStore((state) => state.id);
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState("");

  const { mutate } = usePostUserMessage();

  const sendUserMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate({
      body: {
        message: value,
      },
      params: {
        chatId: chatId!,
      },
    });
    setValue("");
  };

  return (
    <Wrapper $isFocused={isFocused}>
      <form onSubmit={sendUserMessage}>
        <InputBase
          id="userMessage"
          value={value}
          ref={inputRef}
          placeholder="ex) 첫째날 다른 숙소 추천해주고, 둘째날 오전 여행지 다른 여행지로 바꿔줘."
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setValue(event.target.value)
          }
        />
        <ArrowRightSVG width={28} type="submit" />
      </form>
    </Wrapper>
  );
};

export default Input;

const Wrapper = styled.div<{ $isFocused: boolean }>`
  width: 45%;
  height: 55px;
  background-color: #eeeeee;
  border-radius: 30px;
  padding: 0 25px;
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translate(-47%, -50%);
  border: ${({ $isFocused }) =>
    $isFocused ? "2px solid #c4c4c4" : "2px solid transparent"};
  box-sizing: border-box;
  box-shadow: 4px 4px 8px 1px rgb(0 0 0 / 12%);

  ::placeholder {
    color: #c5c5c5;
  }

  & > form {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
`;

const InputBase = styled.input`
  border: none;
  outline: none;
  background: none;
  padding: 0;
  margin: 0;
  font: inherit;
  color: inherit;
  width: 100%;
`;
