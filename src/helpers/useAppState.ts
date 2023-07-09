import { useAppStore } from '@/store';
import { utcToZonedTime } from 'date-fns-tz';
import { resetAllStores } from '@/store';
import type { Router } from 'vue-router';
import { ROUTES_NAME } from '@/router';

export function useAppState(): any {
  const appStore = useAppStore();
  const isValidToken = (): boolean => {
    const expiresIn = appStore.expiresIn;
    const token = appStore.token;

    if (expiresIn && token) {
      const localDate = utcToZonedTime(new Date(), 'UTC');
      const localExpires = utcToZonedTime(new Date(expiresIn), 'UTC');
      return token !== null && localDate < localExpires;
    }
    return false;
  };

  const logOut = async (router: Router) => {
    /* const router = useRouter(); */

    await appStore.logOut();
    resetAllStores();

    await router.push(ROUTES_NAME.HOME);
  };

  return {
    isValidToken,
    logOut,
  };
}
