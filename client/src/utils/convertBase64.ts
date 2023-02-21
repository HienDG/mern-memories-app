const convertBase64 = (file: File): Promise<string> =>
  new Promise<string>((res, rej) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => res(reader.result?.toString() || "");
    reader.onerror = (error) => rej(error);
  });

export default convertBase64;
