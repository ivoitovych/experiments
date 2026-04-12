export const sendEmail = async (email: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Mock send email:', email);
      resolve();
    }, 1000);
  });
};
