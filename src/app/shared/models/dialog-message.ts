export interface DialogMessage {
  title: string;
  message: string;
  confirm: {
    text: string;
    color: string;
  };
  cancel: {
    text: string;
    color: string;
  };
}
