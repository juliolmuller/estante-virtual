import { defineStore, type _GettersTree as GettersTree } from 'pinia';

import { type User } from '~/models';
import { usersApi } from '~/services/api';

interface SignInCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

interface SignUpCredentials {
  email: string;
  name: string;
  password: string;
  passwordRepeat: string;
}

interface AUthStoreState {
  errors: string[];
  isLoading: boolean;
  storage: Storage;
  userData: null | User;
}

export interface AUthStoreGetters extends GettersTree<AUthStoreState> {
  isAuthenticated: (state: AUthStoreState) => boolean;
}

export interface AUthStoreActions {
  recoverFromStorage: () => void;
  signIn: (credentials: SignInCredentials) => Promise<boolean>;
  signOut: () => void;
  signUp: (authData: SignUpCredentials) => Promise<boolean>;
  updateUserData: (authData: {
    email: string;
    id: number;
    name: string;
    newPassword: string;
    oldPassword: string;
  }) => Promise<void>;
}

const STORAGE_KEY = 'user-data';

const useAuth = defineStore<'auth', AUthStoreState, AUthStoreGetters, AUthStoreActions>('auth', {
  state: () => ({
    errors: [],
    isLoading: false,
    storage: sessionStorage,
    userData: null,
  }),

  getters: {
    isAuthenticated(state) {
      return Boolean(state.userData?.id);
    },
  },

  actions: {
    recoverFromStorage() {
      const userDataFromLocal = localStorage.getItem(STORAGE_KEY) as string;
      const userDataFromSession = sessionStorage.getItem(STORAGE_KEY) as string;

      this.userData = JSON.parse(userDataFromLocal || userDataFromSession);
      this.storage = userDataFromLocal ? localStorage : sessionStorage;
    },
    async signIn({ email, password, rememberMe = false }) {
      this.storage = rememberMe ? localStorage : sessionStorage;
      this.isLoading = true;
      this.errors = [];

      try {
        const [userData] = await usersApi.get({ email, password });

        if (!userData) {
          throw new Error('Email e senha inválidos');
        }

        this.userData = userData;
        this.storage.setItem(STORAGE_KEY, JSON.stringify(this.userData));

        return true;
      } catch (error) {
        console.error(error);

        if (error instanceof Error) {
          this.errors = [error.message];
        }

        return false;
      } finally {
        this.isLoading = false;
      }
    },
    async signUp({ name, email, password, passwordRepeat }) {
      this.isLoading = true;
      this.errors = [];

      try {
        const [userData] = await usersApi.get({ email });

        if (userData) {
          throw new Error('Email já cadastrado');
        }

        if (!name?.trim()) this.errors.push('Nome é obrigatório');
        if (!email?.trim()) this.errors.push('Email é obrigatório');
        if (!password?.trim()) this.errors.push('Senha é obrigatória');
        if (password !== passwordRepeat) this.errors.push('Senhas não conferem');

        if (this.errors.length > 0) {
          return false;
        }

        await usersApi.create({ name, email, password });

        return this.signIn({ email, password });
      } catch (error) {
        console.error(error);

        if (error instanceof Error) {
          this.errors = [error.message];
        }

        return false;
      } finally {
        this.isLoading = false;
      }
    },
    signOut() {
      this.$reset();
      localStorage.removeItem(STORAGE_KEY);
      sessionStorage.removeItem(STORAGE_KEY);
    },
    async updateUserData({ id, name, email, oldPassword, newPassword }) {
      const originalUser = await usersApi.find(id);
      const password =
        oldPassword === originalUser?.password
          ? newPassword || oldPassword
          : originalUser?.password;

      this.userData = await usersApi.update(id, { name, email, password });
      this.storage.setItem(STORAGE_KEY, JSON.stringify(this.userData));
    },
  },
});

export default useAuth;
