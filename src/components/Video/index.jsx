import { fetchLicense } from '@/services/api';
import useStore from '@/store';
import shallow from 'zustand/shallow';
import useSWR from 'swr';

const Video = () => {
  const { user } = useStore(
    (state) => ({
      user: state.user,
    }),
    shallow,
  );
  const cpnyId = user.CPY_ID;
  const { data } = useSWR(`/api/trainingData/${cpnyId}`, () =>
    fetchLicense(cpnyId),
  );

  console.log('video data:', data);

  return (
    <section data-name="Video">
      <h1>您好</h1>
      <div className="my-code">
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </section>
  );
};

export default Video;
