/**
 * 파일을 Data URL로 변환하여 미리보기 이미지를 생성
 *
 * @param {File} file - 변환할 파일
 * @returns {Promise<string>} Data URL 문자열
 */
export const createImagePreview = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => {
      if (e.target?.result) {
        resolve(e.target.result as string);
      } else {
        reject(new Error('파일 읽기 실패'));
      }
    };
    reader.onerror = () => reject(new Error('파일 읽기 오류'));
    reader.readAsDataURL(file);
  });
};

