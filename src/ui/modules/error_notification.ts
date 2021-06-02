const defaultTitle = 'Something wrong happened';

export function createErrorNotification({
  description, title = defaultTitle,
}: Record<string, string>) {
  return {
    message: title,
    description,
  };
}