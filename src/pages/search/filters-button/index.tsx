import { FC } from 'react';
import { IconAdjustments } from '@tabler/icons-react';
import { Box } from '@mantine/core';
import './styles.css';

type Props = {
  onClick?: () => void;
}

const FiltersButton: FC<Props> = ({ onClick }) => {
  return (
    <Box className='button' onClick={onClick}>
      <IconAdjustments size={25} />
    </Box>
  )
};

export default FiltersButton;