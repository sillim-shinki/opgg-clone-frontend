import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ThemeToggle from "@/app/_components/ThemeToggle";

describe("ThemeToggle", () => {
  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn(),
    removeItem: jest.fn(),
    length: 0,
    key: jest.fn(),
  };

  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
      writable: true,
    });
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    document.documentElement.setAttribute("data-theme", "dark");
  });

  it("마운트 후 토글 버튼이 렌더링된다", async () => {
    localStorageMock.getItem.mockReturnValue(null);
    render(<ThemeToggle />);

    await waitFor(() => {
      expect(screen.getByRole("button")).toBeInTheDocument();
    });
  });

  it("다크 모드일 때 'LIGHT' 레이블이 표시된다", async () => {
    localStorageMock.getItem.mockReturnValue("dark");
    render(<ThemeToggle />);

    await waitFor(() => {
      expect(screen.getByRole("button")).toHaveTextContent("LIGHT");
    });
  });

  it("라이트 모드일 때 'DARK' 레이블이 표시된다", async () => {
    localStorageMock.getItem.mockReturnValue("light");
    document.documentElement.setAttribute("data-theme", "light");
    render(<ThemeToggle />);

    await waitFor(() => {
      expect(screen.getByRole("button")).toHaveTextContent("DARK");
    });
  });

  it("버튼 클릭 시 다크→라이트로 전환된다", async () => {
    const user = userEvent.setup();
    localStorageMock.getItem.mockReturnValue("dark");
    render(<ThemeToggle />);

    await waitFor(() => screen.getByRole("button"));
    await user.click(screen.getByRole("button"));

    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
  });

  it("버튼 클릭 시 라이트→다크로 전환된다", async () => {
    const user = userEvent.setup();
    localStorageMock.getItem.mockReturnValue("light");
    document.documentElement.setAttribute("data-theme", "light");
    render(<ThemeToggle />);

    await waitFor(() => screen.getByRole("button"));
    await user.click(screen.getByRole("button"));

    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
  });

  it("테마 전환 시 localStorage에 저장된다", async () => {
    const user = userEvent.setup();
    localStorageMock.getItem.mockReturnValue("dark");
    render(<ThemeToggle />);

    await waitFor(() => screen.getByRole("button"));
    await user.click(screen.getByRole("button"));

    expect(localStorageMock.setItem).toHaveBeenCalledWith("theme", "light");
  });

  it("localStorage에 저장된 테마를 마운트 시 읽어온다", async () => {
    localStorageMock.getItem.mockReturnValue("light");
    render(<ThemeToggle />);

    await waitFor(() => {
      expect(screen.getByRole("button")).toHaveTextContent("DARK");
    });

    expect(localStorageMock.getItem).toHaveBeenCalledWith("theme");
  });

  it("접근성: 버튼에 aria-label이 있다", async () => {
    localStorageMock.getItem.mockReturnValue("dark");
    render(<ThemeToggle />);

    await waitFor(() => {
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-label");
    });
  });
});
