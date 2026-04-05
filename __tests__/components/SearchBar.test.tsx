import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";
import SearchBar from "@/app/_components/SearchBar";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockUseRouter = useRouter as jest.Mock;

describe("SearchBar", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    mockPush.mockClear();
    mockUseRouter.mockReturnValue({ push: mockPush });
  });

  it("소환사 검색 입력창이 렌더링된다", () => {
    render(<SearchBar />);
    expect(
      screen.getByPlaceholderText("소환사명 + #KR1")
    ).toBeInTheDocument();
  });

  it("리전 셀렉터가 렌더링되며 기본값은 KR이다", () => {
    render(<SearchBar />);
    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();
    expect(select).toHaveValue("kr");
  });

  it("검색 버튼이 렌더링된다", () => {
    render(<SearchBar />);
    expect(screen.getByRole("button", { name: /검색/i })).toBeInTheDocument();
  });

  it("입력값이 변경되면 input 값이 업데이트된다", async () => {
    const user = userEvent.setup();
    render(<SearchBar />);

    const input = screen.getByPlaceholderText("소환사명 + #KR1");
    await user.type(input, "Faker");

    expect(input).toHaveValue("Faker");
  });

  it("빈 쿼리로 제출하면 라우팅하지 않는다", async () => {
    const user = userEvent.setup();
    render(<SearchBar />);

    await user.click(screen.getByRole("button", { name: /검색/i }));

    expect(mockPush).not.toHaveBeenCalled();
  });

  it("공백만 있는 쿼리로 제출하면 라우팅하지 않는다", async () => {
    const user = userEvent.setup();
    render(<SearchBar />);

    const input = screen.getByPlaceholderText("소환사명 + #KR1");
    await user.type(input, "   ");
    await user.click(screen.getByRole("button", { name: /검색/i }));

    expect(mockPush).not.toHaveBeenCalled();
  });

  it("소환사명 입력 후 검색 버튼 클릭 시 올바른 경로로 이동한다", async () => {
    const user = userEvent.setup();
    render(<SearchBar />);

    const input = screen.getByPlaceholderText("소환사명 + #KR1");
    await user.type(input, "Hide on bush");
    await user.click(screen.getByRole("button", { name: /검색/i }));

    expect(mockPush).toHaveBeenCalledWith(
      "/summoner/kr/Hide%20on%20bush"
    );
  });

  it("소환사명 입력 후 Enter 키로 제출 시 올바른 경로로 이동한다", async () => {
    const user = userEvent.setup();
    render(<SearchBar />);

    const input = screen.getByPlaceholderText("소환사명 + #KR1");
    await user.type(input, "Faker{Enter}");

    expect(mockPush).toHaveBeenCalledWith("/summoner/kr/Faker");
  });

  it("리전을 변경한 후 검색하면 변경된 리전으로 라우팅한다", async () => {
    const user = userEvent.setup();
    render(<SearchBar />);

    await user.selectOptions(screen.getByRole("combobox"), "na1");

    const input = screen.getByPlaceholderText("소환사명 + #KR1");
    await user.type(input, "Doublelift");
    await user.click(screen.getByRole("button", { name: /검색/i }));

    expect(mockPush).toHaveBeenCalledWith("/summoner/na1/Doublelift");
  });

  it("특수문자가 포함된 소환사명은 인코딩되어 라우팅한다", async () => {
    const user = userEvent.setup();
    render(<SearchBar />);

    const input = screen.getByPlaceholderText("소환사명 + #KR1");
    await user.type(input, "신림신기#KR1");
    await user.click(screen.getByRole("button", { name: /검색/i }));

    expect(mockPush).toHaveBeenCalledWith(
      "/summoner/kr/%EC%8B%A0%EB%A6%BC%EC%8B%A0%EA%B8%B0%23KR1"
    );
  });
});
