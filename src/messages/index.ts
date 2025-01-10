export type SurveyCreateMessages = {
  title: string;
  description: string;
  questions: string;
  options: string;
  addOption: string;
  addQuestion: string;
  removeOption: string;
  removeQuestion: string;
  targetNumber: string;
  duration: string;
  rewardPool: string;
  submit: string;
};

export const surveyCreateTranslations: Record<string, SurveyCreateMessages> = {
  en: {
    title: "Title",
    description: "Description",
    questions: "Questions",
    options: "Options",
    addOption: "Add Option",
    addQuestion: "Add Question",
    removeOption: "Remove",
    removeQuestion: "Remove Question",
    targetNumber: "Target Number",
    duration: "Duration",
    rewardPool: "Reward Pool",
    submit: "Submit",
  },
  ko: {
    title: "제목",
    description: "설명",
    questions: "질문",
    options: "옵션",
    addOption: "옵션 추가",
    addQuestion: "질문 추가",
    removeOption: "삭제",
    removeQuestion: "질문 삭제",
    targetNumber: "목표 수",
    duration: "지속 시간",
    rewardPool: "보상 풀",
    submit: "제출",
  },
  ja: {
    title: "タイトル",
    description: "説明",
    questions: "質問",
    options: "オプション",
    addOption: "オプション追加",
    addQuestion: "質問追加",
    removeOption: "削除",
    removeQuestion: "質問削除",
    targetNumber: "ターゲット数",
    duration: "期間",
    rewardPool: "報酬プール",
    submit: "提出",
  },
  "zh-TW": {
    title: "標題",
    description: "描述",
    questions: "問題",
    options: "選項",
    addOption: "新增選項",
    addQuestion: "新增問題",
    removeOption: "刪除",
    removeQuestion: "刪除問題",
    targetNumber: "目標數字",
    duration: "持續時間",
    rewardPool: "獎池",
    submit: "提交",
  },
  th: {
    title: "หัวข้อ",
    description: "คำอธิบาย",
    questions: "คำถาม",
    options: "ตัวเลือก",
    addOption: "เพิ่มตัวเลือก",
    addQuestion: "เพิ่มคำถาม",
    removeOption: "ลบ",
    removeQuestion: "ลบคำถาม",
    targetNumber: "เป้าหมายจำนวน",
    duration: "ระยะเวลา",
    rewardPool: "กองรางวัล",
    submit: "ยืนยัน",
  },
};

export type SurveysMessages = {
  hotTopics: string;
  endingSoon: string;
  surveys: string;
};

export const surveysTranslations: Record<string, SurveysMessages> = {
  en: {
    hotTopics: "Hot Topics",
    endingSoon: "Ending Soon",
    surveys: "Surveys",
  },
  ko: {
    hotTopics: "인기 주제",
    endingSoon: "마감 임박",
    surveys: "설문",
  },
  ja: {
    hotTopics: "人気のトピック",
    endingSoon: "終了間近",
    surveys: "アンケート",
  },
  "zh-TW": {
    hotTopics: "熱門話題",
    endingSoon: "即將結束",
    surveys: "調查",
  },
  th: {
    hotTopics: "หัวข้อยอดนิยม",
    endingSoon: "ใกล้หมดเวลา",
    surveys: "แบบสำรวจ",
  },
};

export type NavMessages = {
  survey: string;
  create: string;
  myPage: string;
  store: string;
};

export const navTranslations: Record<string, NavMessages> = {
  en: {
    survey: "Survey",
    create: "Create",
    store: "Store",
    myPage: "My Page",
  },
  ko: {
    survey: "설문",
    create: "생성",
    store: "상점",
    myPage: "마이 페이지",
  },
  ja: {
    survey: "アンケート",
    create: "作成",
    store: "ストア",
    myPage: "マイページ",
  },
  "zh-TW": {
    survey: "調查",
    create: "創建",
    store: "商店",
    myPage: "我的頁面",
  },
  th: {
    survey: "แบบสำรวจ",
    create: "สร้าง",
    store: "ร้านค้า",
    myPage: "หน้าของฉัน",
  },
};
