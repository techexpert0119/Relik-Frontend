import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IUserDetails } from '@/data/interfaces/user-details';
import { IAgency } from '@/data/interfaces/agency';
import {
  addRefreshToken,
  addTokenToAxios,
  removeRefreshTokenFromAxios,
  removeTokenFromAxios,
} from '@/services/api/api';

interface AuthStore {
  isLogged: boolean;
  user: IUserDetails | undefined | null;
  accessToken: string | undefined | null;
  authorize: (
    user: IUserDetails,
    accessToken: string,
    refreshToken?: string,
    agencies?: IAgency[]
  ) => void;
  updateUserData: (data: {
    email?: string;
    name?: string;
    photo?: string;
    currentAgency?: string | undefined;
  }) => void;
  logout: () => void;
  agencies: [] | IAgency[];
  addUserAgency: (agencies?: IAgency[]) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isLogged: false,
      user: undefined,
      accessToken: undefined,
      agencies: [],
      addUserAgency: (agencies) => {
        set((state) => {
          return { ...state, agencies };
        });
      },
      updateUserData: (data) => {
        const { email, name, photo, currentAgency } = data;
        set((state) => {
          if (state.user) {
            let toSet: Partial<IUserDetails> = {};

            if (email) toSet = { ...toSet, email: email };
            if (name) toSet = { ...toSet, firstName: name };
            if (photo) toSet = { ...toSet, photo: photo };
            toSet = { ...toSet, currentAgency: currentAgency };

            return { ...state, user: { ...state.user, ...toSet } };
          }

          return state;
        });
      },
      authorize: (
        user: IUserDetails,
        accessToken: string,
        refreshToken?: string,
        agencies?: IAgency[]
      ) => {
        set({
          user: user,
          accessToken: accessToken,
          isLogged: true,
          agencies: agencies,
        });
        addTokenToAxios(accessToken);
        refreshToken && addRefreshToken(refreshToken);
      },

      logout: () => {
        set({ user: null, accessToken: null, isLogged: false });
        removeTokenFromAxios();
        removeRefreshTokenFromAxios();
      },
    }),
    { name: 'auth' }
  )
);
