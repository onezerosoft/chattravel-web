const ChattingGuide = (
  <div>
    <h2>🤖 챗트에겐 이렇게 물어봐!</h2>
    <p style={{ fontWeight: "600", padding: "5px 0 2px 0" }}>
      1. 챗트는 한 번에 하나의 요청만 들어줄 수 있어요. 질문은 한가지씩만!
    </p>
    <p style={{ paddingLeft: "10px", fontSize: "12px", color: "gray" }}>
      ex) "이 박물관 입장료랑 운영시간 알려줘." (X)
    </p>
    <p style={{ paddingLeft: "10px", fontSize: "12px", color: "gray" }}>
      ex) "이 박물관 입장료 알려줘." (O)
    </p>
    <p style={{ fontWeight: "600", padding: "5px 0 2px 0" }}>
      2. 맘에 들지 않는 숙소, 식당, 카페, 여행지 다 변경할 수 있어요.
    </p>
    <p style={{ paddingLeft: "10px", fontSize: "12px", color: "gray" }}>
      ex) "나 여기 가봤어. 다른 곳 추천해줘."
    </p>
    <p style={{ paddingLeft: "10px", fontSize: "12px", color: "gray" }}>
      ex) "나 해산물을 못 먹는데, 다른 식당 알려줄 수 있어?"
    </p>
    <p style={{ fontWeight: "600", padding: "5px 0 2px 0" }}>
      3. 여행 가이드와 함께 대화한다 생각하고 편하게 질답하세요.
    </p>
    <p style={{ paddingLeft: "10px", fontSize: "12px", color: "gray" }}>
      ex) "이 곳에 가는데 필요한 준비물 있어?"
    </p>
    <p style={{ fontWeight: "600", padding: "5px 0 2px 0" }}>
      4. 여행 코스가 맘에 들면 코스 하단의 '코스 내보내기' 버튼을 클릭해보세요!
      <br />
      변경 전의 여행 코스도 선택할 수 있어요.
    </p>
    {/* <h2>💡 자주 묻는 질문</h2>
    <p>Q. 챗트의 똑똑지수는 무엇인가요?</p>
    <p>A. 현재 사용자들의 </p>
    <p>Q. 여행지 추천점수는 무엇인가요?</p>
    <p>A. 당신의 여행스타일에 고려해서 </p> */}
  </div>
);

export default ChattingGuide;
