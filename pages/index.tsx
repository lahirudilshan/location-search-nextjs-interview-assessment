import Map from '@shared/components/map';
import { Space } from '@shared/utils/styles';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <Space>
      <Map />
    </Space>
  )
}

export default Home
