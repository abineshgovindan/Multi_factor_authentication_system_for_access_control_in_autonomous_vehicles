import create from "zustand";

function setTokensToLocalStorage({ accessToken, refreshToken, userId }) {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem("userId", userId);
  
}

function removeTokensFromLocalStorage() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userId");

}

export const useAuthStore = create((set, get) => ({
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  userId: localStorage.getItem("userId") || null,

  
  isLoggedIn: () => !!get().accessToken,
  login: (tokens) => {
    setTokensToLocalStorage(tokens);
    set((state) => ({
      ...state,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      userId: tokens.userId,
     
      
    }));
  },
  logout: () => {
    removeTokensFromLocalStorage();
    set((state) => ({
      ...state,
      accessToken: null,
      refreshToken: null,
      userId: null,
   

    }));
  },
}));
