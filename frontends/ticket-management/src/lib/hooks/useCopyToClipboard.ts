import { useInfoSnackbar } from '@websummit/components/src/molecules/Snackbar';
import copyToClipboard from '@websummit/glue/src/lib/utils/copyToClipboard';

export default () => {
  const info = useInfoSnackbar();

  return (copyMe: string) => {
    copyToClipboard(copyMe);
    info('Link copied to clipboard');
  };
};
