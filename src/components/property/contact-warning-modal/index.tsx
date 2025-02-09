import {
  Stack,
  Container,
  Group,
  Title,
  List,
  Text,
  Button,
  Modal,
} from '@mantine/core';
import { useOs } from '@mantine/hooks';
import { FC } from 'react';

const {
  VITE_SUPPORT_USERNAME: SUPPORT_USERNAME,
} = import.meta.env;

type Props = {
  opened: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const ContactWarningModal: FC<Props> = ({ opened, onClose, onConfirm }) => {
  const supportLink = `https://t.me/${SUPPORT_USERNAME}`
  const os = useOs();
  const isIOS = os === 'ios';

  return (
    <Modal.Root
      opened={opened}
      onClose={onClose}
      fullScreen
      radius={0}
      transitionProps={{ transition: 'fade', duration: 200 }}
    >
      <Modal.Overlay />
      <Modal.Content pt={ isIOS ? '30px' : '0px' }>
        <Modal.Header>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body >
          <Container p='8px' pb='md'>
            <Stack>
              <Group>
                <Title order={4}>Внимание! Будьте осторожны:</Title>
                <List pl={10}>
                  <List.Item mb='xs'>
                    <b>Не переводите предоплату:&nbsp;</b><br/>
                    Оплачивайте только при личной встрече или при получении товара/услуги.
                  </List.Item>
                  <List.Item mb='xs'>
                    <b>Проверяйте информацию:&nbsp;</b><br/>Убедитесь, что данные о недвижимости/арендодателе достоверны.
                  </List.Item>
                  <List.Item mb='xs'>
                    <b>Учтите:&nbsp;</b><br/>Администрация приложения <b>не связана</b> с лицами, публикующими объявления.
                  </List.Item>
                  <List.Item mb='xs'>
                    <b>Сообщайте:&nbsp;</b><br/>Если заметите подозрительную активность, пишите в поддержку <a href={supportLink} target="_blank">@HomesFinderSupport</a>
                  </List.Item>
                </List>

                <Text>
                  Будь внимателен, и если возникнут сомнения, обязательно обращайтесь в <a href={supportLink} target="_blank">@HomesFinderSupport</a>!
                </Text>
              </Group>
            </Stack>
            <Group mt='lg'>
              <Button
                onClick={onConfirm}
                color="#FF5A5F"
                flex={1}
              >
                Написать
              </Button>
            </Group>
          </Container>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}

export default ContactWarningModal;
