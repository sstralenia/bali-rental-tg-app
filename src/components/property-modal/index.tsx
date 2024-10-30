import { FC } from 'react';
import { Modal } from '@mantine/core';
import { Property as PropertyType } from '../../types';
import Property from '../property';

type Props = {
  property: PropertyType | null;
  onBack: () => void;
}

const PropertyModal: FC<Props> = ({ property, onBack }) => {
  return (
    <Modal.Root
      opened={true}
      onClose={onBack}
      fullScreen
    >
      <Modal.Content>
        <Modal.Body p={0} pt="10px">
          <Property property={property} onBack={onBack} />
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  )
}

export default PropertyModal;