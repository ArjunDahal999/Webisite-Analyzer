import {
  createSafeActionClient,
  DEFAULT_SERVER_ERROR_MESSAGE,
} from 'next-safe-action';


export const baseActionClient = createSafeActionClient({
  handleServerError(e) {
    console.error('Action error:', e.message);
    if (e instanceof Error) {
      return {
        message: e.message || DEFAULT_SERVER_ERROR_MESSAGE,
        data: null,
        success: false,
      };
    }
    return {
      message: DEFAULT_SERVER_ERROR_MESSAGE,
      data: null,
      success: false,
    };
  },
});