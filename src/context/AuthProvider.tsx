import React, {
  createContext,
  ReactNode,
  useContext,
  useReducer,
  useState,
  useEffect,
} from "react";
import usersData from "../data/users.json";
import { User } from "../types/User";

// Define action types
type FormAction =
  | { type: "CHANGE"; field: "email"; value: string }
  | { type: "CHANGE"; field: "password"; value: string }
  | { type: "CHANGE"; field: "rememberMe"; value: boolean };

type ErrorAction =
  | { type: "SET_ERROR"; field: keyof ErrorState; error: string }
  | { type: "RESET_ERRORS" };

// Auth Context Type
type AuthContextType = {
  loggedin: boolean;
  currentUser: User | null;
  handleLogin: (e: React.FormEvent) => void;
  handleLogout: () => void;
  formState: FormState;
  errorState: ErrorState;
  formDispatch: React.Dispatch<FormAction>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Types
type FormState = {
  email: string;
  password: string;
  rememberMe: boolean;
};

type ErrorState = {
  emailError: string;
  passwordError: string;
  formError: string;
};

// Initial States
const initialFormState: FormState = {
  email: "",
  password: "",
  rememberMe: false,
};

const initialErrorState: ErrorState = {
  emailError: "",
  passwordError: "",
  formError: "",
};

// Reducers
function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        [action.field]: action.value,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function errorReducer(state: ErrorState, action: ErrorAction): ErrorState {
  switch (action.type) {
    case "SET_ERROR":
      return {
        ...state,
        [action.field]: action.error,
      };
    case "RESET_ERRORS":
      return initialErrorState;
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

// Provider
function AuthProvider({ children }: { children: ReactNode }) {
  const [loggedin, setLoggedin] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [formState, formDispatch] = useReducer(formReducer, initialFormState);
  const [errorState, errorDispatch] = useReducer(errorReducer, initialErrorState);

  // On mount, restore auth state and user from storage
  useEffect(() => {
    const rememberMe = localStorage.getItem("rememberMe") === "true";
    const storage = rememberMe ? localStorage : sessionStorage;
    const storedLogged = storage.getItem("loggedin") === "true";
    const storedUser = storage.getItem("user");
    if (storedLogged && storedUser) {
      setLoggedin(true);
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  // Validate Form
  function validateForm(): boolean {
    let isValid = true;
    errorDispatch({ type: "RESET_ERRORS" });

    if (formState.email.trim() === "") {
      errorDispatch({
        type: "SET_ERROR",
        field: "emailError",
        error: "Email is required.",
      });
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      errorDispatch({
        type: "SET_ERROR",
        field: "emailError",
        error: "Email is invalid.",
      });
      isValid = false;
    }

    if (formState.password.trim() === "") {
      errorDispatch({
        type: "SET_ERROR",
        field: "passwordError",
        error: "Password is required.",
      });
      isValid = false;
    }

    return isValid;
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const foundUser = usersData.users.find(
      (user) =>
        user.email === formState.email && user.password === formState.password
    );

    if (foundUser) {
      setLoggedin(true);
      setCurrentUser(foundUser);

      const storage = formState.rememberMe ? localStorage : sessionStorage;
      storage.setItem("loggedin", "true");
      storage.setItem("user", JSON.stringify(foundUser));
      if (formState.rememberMe) {
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberMe");
      }
    } else {
      errorDispatch({
        type: "SET_ERROR",
        field: "formError",
        error: "Invalid email or password.",
      });
    }
  };

  const handleLogout = () => {
    setLoggedin(false);
    setCurrentUser(null);
    localStorage.removeItem("loggedin");
    localStorage.removeItem("user");
    localStorage.removeItem("rememberMe");
    sessionStorage.removeItem("loggedin");
    sessionStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        loggedin,
        currentUser,
        handleLogin,
        handleLogout,
        formState,
        errorState,
        formDispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook
function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("useAuth must be used within AuthProvider");
  return context;
}

export { AuthProvider, useAuth };