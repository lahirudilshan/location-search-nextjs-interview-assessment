import { Grid } from '@mui/material'
import Map from '@shared/components/Map'
import Search from '@shared/components/Search'
import { Space } from '@shared/utils/styles'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <Space>
      <Map />
    </Space>
  )
}

export default Home
