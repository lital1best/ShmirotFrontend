let snackbarRef;

export const SnackbarUtils = {
    setSnackbar: (ref) => {
        snackbarRef = ref;
    },
    show: (message, variant = 'error') => {
        if (snackbarRef) {
            snackbarRef(message, variant);
        } else {
            console.warn('Snackbar not initialized yet');
        }
    },
};