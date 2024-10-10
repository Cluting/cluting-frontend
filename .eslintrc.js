module.exports = {
  root: true,
  env: { browser: true, es2020: true }, // 브라우저 환경 및 ES2020 환경 설정

  extends: [
    "eslint:recommended", // ESLint의 기본 권장 규칙 사용
    "plugin:@typescript-eslint/recommended", // TypeScript 관련 권장 규칙 사용
    "plugin:react-hooks/recommended", // React Hooks 규칙 사용
    "plugin:prettier/recommended"
  ],

  ignorePatterns: ["dist", ".eslintrc.cjs"], // ESLint 무시할 파일 또는 디렉토리 설정

  parser: "@typescript-eslint/parser", // TypeScript 구문 분석기 사용

  plugins: ["react-refresh"], // React Refresh 플러그인 사용

  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true }
    ], // React 컴포넌트는 오직 컴포넌트만 내보내야 합니다.

    indent: ["error", 2], // 들여쓰기 스타일 설정 (2칸 들여쓰기)

    "no-unused-vars": "off", // 사용하지 않는 변수 경고 끄기

    "@typescript-eslint/no-unused-vars": [
      "error",
      { vars: "all", args: "after-used", ignoreRestSiblings: false }
    ], // TypeScript에서 사용하지 않는 변수를 검출합니다.

    "@typescript-eslint/explicit-function-return-type": "warn",
    // 함수의 반환 타입이 추론 가능할 때도 명시적으로 타입을 선언하도록 경고합니다.

    "no-empty": "warn", // 빈 블록문에 대한 경고 설정

    semi: ["error", "always"] // 세미콜론(;) 사용 강제 설정
  }
};
