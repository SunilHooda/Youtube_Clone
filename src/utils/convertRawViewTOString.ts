export const convertRawViewTOString = (labelValue: String, isSub = false) => {
  //Nine Zeros to billions
  return Math.abs(Number(labelValue)) >= 1.0e9
    ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(0) + "B"
    : Math.abs(Number(labelValue)) >= 1.0e6
    ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(0) + "M"
    : Math.abs(Number(labelValue)) >= 1.0e3
    ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(0) + "K"
    : Math.abs(Number(labelValue)).toString();
};
