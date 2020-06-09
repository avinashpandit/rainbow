import Clipboard from '@react-native-community/clipboard';
import { debounce } from 'lodash';
import { useCallback } from 'react';
import Mailer from 'react-native-mail';
import { Alert } from '../components/alerts';

const FeedbackEmailAddress = 'support@rainbow.me';

const setClipboardToFeedbackEmail = () =>
  Clipboard.setString(FeedbackEmailAddress);

const FeedbackErrorAlert = () =>
  Alert({
    buttons: [
      {
        onPress: setClipboardToFeedbackEmail,
        text: 'Copy email address',
      },
      {
        style: 'cancel',
        text: 'No thanks',
      },
    ],
    message:
      'Would you like to manually copy our feedback email address to your clipboard?',
    title: 'Error launching email client',
  });

const handleMailError = debounce(
  error => (error ? FeedbackErrorAlert() : null),
  250
);

const feedbackEmailOptions = {
  recipients: [FeedbackEmailAddress],
  subject: '🌈️ Rainbow Feedback',
};

export default function useSendFeedback() {
  const onSendFeedback = useCallback(
    () => Mailer.mail(feedbackEmailOptions, handleMailError),
    []
  );
  return onSendFeedback;
}