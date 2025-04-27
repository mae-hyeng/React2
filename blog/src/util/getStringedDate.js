export const getStringedDate = (targetDate) => {
  // 날짜값을 YYYY-MM-DD 형태로 반환할 함수
  targetDate = new Date(targetDate);
  // localStorage에 저장하면서 createdDate값이 자동으로 UTC로 변환돼서 추가함
  let year = targetDate.getFullYear();
  let month = targetDate.getMonth() + 1;
  let date = targetDate.getDate();

  if (month < 10) {
    month = `0${month}`;
  }
  if (date < 10) {
    date = `0${date}`;
  }

  return `${year}-${month}-${date}`;
};
