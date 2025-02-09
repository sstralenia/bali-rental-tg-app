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

type Props = {
  opened: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const OrderWarningModal: FC<Props> = ({ opened, onClose, onConfirm }) => {
  const os = useOs();
  const isIOS = os === 'ios';

  return (
    <Modal.Root
      opened={opened}
      onClose={onClose}
      fullScreen
      radius={0}
      transitionProps={{ transition: 'fade', duration: 200 }}
      removeScrollProps={{ allowPinchZoom: false }}
    >
      <Modal.Overlay />
      <Modal.Content pt={ isIOS ? '30px' : '0px' }>
        <Modal.Header>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <Container p='8px'>
            <Stack>
              <Group>
                <Text>Прежде, чем подтвердить заказ, пожалуйста, ознакомьтесь с информацией ниже</Text>

                <Title order={4}> Услуга просмотра виллы от Homes включает </Title>

                <List>
                  <List.Item mb='xs'>
                    <b>Выбор объекта и передача данных.</b><br/>
                    Вы находите виллу, уточняете у арендодателя о возможность просмотра и передаёте информацию Homes Support о доступности виллы.</List.Item>
                  <List.Item mb='xs'>
                    <b>Согласование просмотра.</b><br/>
                    В течение 24 часов  Homes связывается с арендодателем и договаривается о просмотре на ближайшее возможное время.</List.Item>
                  <List.Item mb='xs'>
                    <b>Оплата.</b>
                    После согласования даты просмотра вы получите ссылку для оплаты. Оплата должна быть произведена не позднее чем за 4 часа до просмотра или заказ будет отменен
                    Отмена просмотра и возврат средств:
                    <List>
                      <List.Item mb='xs'>При отмене просмотра арендодателем оплата возвращается полностью.</List.Item>
                      <List.Item mb='xs'>При отмене просмотра заказчиком возвращается 50% суммы.</List.Item>
                    </List>
                  </List.Item>
                  <List.Item mb='xs'>
                    <b>Проверка виллы.</b><br/>
                    Homes осматривает жильё по ключевым критериям:
                    <List>
                      <List.Item>Состояние потолков, стен, мебели и техники.</List.Item>
                      <List.Item>Наличие плесени, трещин, протечек.</List.Item>
                      <List.Item>Напор воды, наличие горячей воды, чистота сантехники.</List.Item>
                      <List.Item>Чистота бассейна.</List.Item>
                      <List.Item>Скорость интернета.</List.Item>
                      <List.Item>Уровень шума от дороги/стройки/животных.</List.Item>
                      <List.Item>и др.</List.Item>
                    </List>
                  </List.Item>
                  <List.Item mb='xs'>
                    <b>Отчёт клиенту.</b><br/>
                    После осмотра вы получаете:
                    <List>
                      <List.Item>Видеообзор всех комнат и территории.</List.Item>
                      <List.Item>Фото с замеченными повреждениями (если есть).</List.Item>
                    </List>
                  </List.Item>
                </List>
              </Group>
            </Stack>
            <Group mt='lg' mb='40px'>
              <Button
                onClick={onConfirm}
                color="#FF5A5F"
                flex={1}
              >
                Заказать
              </Button>
            </Group>
          </Container>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}

export default OrderWarningModal;
