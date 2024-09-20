import { createFileRoute, useNavigate } from "@tanstack/react-router";
import styled from "styled-components";
import PageTemplate from "../components/common/PageTemplate";
import { useState } from "react";
import 자연도시 from "../components/style/자연도시";
import 관광휴식 from "../components/style/관광휴식";
import 숙박 from "../components/style/숙박";
import 사진 from "../components/style/사진";

export const Route = createFileRoute("/style")({
  component: Style,
});

function Style() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"자연도시" | "관광휴식" | "숙박" | "사진">(
    "자연도시"
  );

  return (
    <PageTemplate pageName="Style" badgeText="Choose your style!">
      <SliderWrapper>
        {step == "자연도시" && <자연도시 onNext={() => setStep("관광휴식")} />}
        {step == "관광휴식" && (
          <관광휴식
            onNext={() => setStep("숙박")}
            onPrev={() => setStep("자연도시")}
          />
        )}
        {step == "숙박" && (
          <숙박
            onNext={() => setStep("사진")}
            onPrev={() => setStep("관광휴식")}
          />
        )}
        {step == "사진" && (
          <사진
            onNext={() => navigate({ to: "/chat", replace: true })}
            onPrev={() => setStep("숙박")}
          />
        )}
      </SliderWrapper>
    </PageTemplate>
  );
}

export default Style;

const SliderWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-top: 60px;
  position: relative;

  width: 60%;
  height: 50%;
`;
