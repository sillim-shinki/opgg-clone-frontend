import { render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
import Home from "@/app/page";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// ThemeToggle은 useEffect 이후 렌더링되므로 간단히 mock 처리
jest.mock("../app/_components/ThemeToggle", () => ({
  __esModule: true,
  default: () => <button>theme-toggle</button>,
}));

const mockUseRouter = useRouter as jest.Mock;

describe("Home 페이지", () => {
  beforeEach(() => {
    mockUseRouter.mockReturnValue({ push: jest.fn() });
  });

  it("브랜드명 '신림신기'가 렌더링된다", () => {
    render(<Home />);
    expect(screen.getByText("신림신기")).toBeInTheDocument();
  });

  it("'.GG'가 렌더링된다", () => {
    render(<Home />);
    expect(screen.getByText(".GG")).toBeInTheDocument();
  });

  it("소환사 검색 입력창이 렌더링된다", () => {
    render(<Home />);
    expect(
      screen.getByPlaceholderText("소환사명 + #KR1")
    ).toBeInTheDocument();
  });

  it("검색 버튼이 렌더링된다", () => {
    render(<Home />);
    expect(screen.getByRole("button", { name: /검색/i })).toBeInTheDocument();
  });

  it("테마 토글 버튼이 렌더링된다", () => {
    render(<Home />);
    expect(screen.getByText("theme-toggle")).toBeInTheDocument();
  });

  it("인기 소환사 목록이 모두 렌더링된다", () => {
    render(<Home />);
    const trendingSummoners = [
      "Hide on bush",
      "흑잭장",
      "야동공유",
      "김단검 김순보",
      "JustLikeThatKR",
      "우리꽐술연",
    ];

    trendingSummoners.forEach((name) => {
      expect(screen.getByRole("button", { name })).toBeInTheDocument();
    });
  });

  it("'소환사 전적 검색' 레이블이 렌더링된다", () => {
    render(<Home />);
    expect(screen.getByText("소환사 전적 검색")).toBeInTheDocument();
  });

  it("서브타이틀이 렌더링된다", () => {
    render(<Home />);
    expect(
      screen.getByText("전적을 분석하고 승리를 설계하세요")
    ).toBeInTheDocument();
  });
});
