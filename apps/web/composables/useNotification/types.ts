export interface Notification {
  message: string;
  action?: { text: string; onClick: (...arguments_: any) => void };
  type: 'primary' | 'secondary' | 'negative' | 'neutral';
  persist?: boolean;
  id?: symbol;
  dismiss?: () => void;
}
export type SendNotification = (notification: Notification) => void;

export interface UseNotificationState {
  data: Notification[];
}

export interface UseNotification {
  data: Readonly<Ref<UseNotificationState['data']>>;
  send: SendNotification;
}

export type UseNotificationReturn = () => UseNotification;
