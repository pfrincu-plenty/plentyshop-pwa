import { Notification } from 'composables/useNotification';

export interface BaseNotificationProps {
  notification: Notification;
  size?: 'sm' | 'base';
  strong?: boolean;
}
