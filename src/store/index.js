import create from 'zustand';
import {
  getJWTToken,
  verifyToken,
  fetchLogin,
  cleanToken,
} from '@/services/api';

const initialState = {
  isAppInitializedComplete: false,
  user: null,
  loading: false,
};

const useStore = create((set) => {
  return {
    ...initialState,
    // --------------------------- Action
    init() {
      console.log('init');
      const token = getJWTToken();
      if (token) {
        verifyToken(token)
          .then((res) => {
            set({
              user: res.user,
            });
          })
          .catch(() => {})
          .finally(() => {
            set({
              isAppInitializedComplete: true,
            });
          });
      } else {
        set({
          isAppInitializedComplete: true,
        });
      }
    },
    onLogin(email: string, password: string) {
      set({ loading: true });
      fetchLogin(email, password)
        .then((response) => {
          console.log('設定user');
          set({ user: response.user });
        })
        .finally(() => {
          set({ loading: false });
        });
    },
    onLogout() {
      cleanToken();
      window.location.reload();
    },
  };
});

export default useStore;
