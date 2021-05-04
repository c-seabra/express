import { useEventTimeZoneQuery } from '../@types/operations';
import { useRequestContext } from '../utils/AppContext';

export default () => {
  const context = useRequestContext();

  const { data: evenTimeZoneData } = useEventTimeZoneQuery({
    context,
    variables: {
      slug: context?.slug,
    },
  });

  return evenTimeZoneData?.event?.timeZone;
};
