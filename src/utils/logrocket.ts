import LogRocket from 'logrocket';

export const initLogRocket = () => {
  if (process.env.NODE_ENV === 'production' && typeof window !== 'undefined') {
    LogRocket.init(process.env.NEXT_PUBLIC_LOGROCKET_APP_ID!, {
      release: process.env.npm_package_version
    }); // <-- Replace with your LogRocket project ID
  }
};
