<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# 프로젝트 공통 규칙

## 언어
- 모든 답변과 커뮤니케이션은 **한국어**로 한다.

---

## 테스트
- 모든 기능 구현 후 반드시 테스트를 작성하고 실행한다.
- 테스트가 통과하지 않으면 해당 기능은 완료된 것으로 간주하지 않는다.
- 테스트는 구현 코드와 같은 PR에 포함되어야 한다.

---

## Git 컨벤션

### 브랜치 전략
- `main` — 배포 가능한 안정 브랜치. 직접 푸시 금지.
- `feat/<기능명>` — 새 기능 개발
- `fix/<버그명>` — 버그 수정
- `refactor/<대상>` — 리팩토링
- `chore/<작업명>` — 빌드, 설정, 패키지 등 비기능 작업
- `docs/<대상>` — 문서 작성/수정

### 커밋 메시지
형식: `<type>: <내용>` (한국어로 작성)

| type | 용도 |
|------|------|
| `feat` | 새 기능 추가 |
| `fix` | 버그 수정 |
| `refactor` | 동작 변경 없는 코드 개선 |
| `test` | 테스트 추가/수정 |
| `chore` | 빌드, 설정, 패키지 관련 |
| `docs` | 문서 변경 |
| `style` | 포매팅, 세미콜론 등 코드 의미 무관 변경 |

예시:
```
feat: 소환사 검색 기능 추가
fix: 랭크 아이콘 이미지 깨지는 버그 수정
test: 소환사 검색 API 유닛 테스트 추가
```

### PR 규칙
- PR 제목은 커밋 메시지 형식과 동일하게 작성한다.
- PR은 하나의 목적만 담는다 (기능 + 버그 수정 혼재 금지).
- `main` 브랜치로의 머지는 PR을 통해서만 허용한다.

---

## 데이터 페칭 & 서버 통신
- 서버와의 데이터 통신은 **Server Actions**를 사용한다. API Route Handler 사용을 지양한다.
- Server Actions는 `app/actions/` 디렉토리에 모아서 관리한다.
- `"use server"` 지시어를 파일 상단에 명시한다.

---

## 스타일링 & UI 컴포넌트
- 스타일링은 **Tailwind CSS**만 사용한다. 인라인 스타일이나 별도 CSS 파일 작성을 지양한다.
- UI 컴포넌트는 **shadcn/ui**를 우선 사용한다. shadcn/ui에 없는 컴포넌트만 직접 구현한다.
- shadcn 컴포넌트 추가 시 `npx shadcn@latest add <컴포넌트명>` 명령어를 사용한다.
