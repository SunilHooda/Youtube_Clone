export const parseVideoDuration = (duration: string): string => {
  if (typeof duration === "string") {
    const newDuration: string = duration
      .replace("PT", "")
      .replace("P1DT", "")
      .replace("H", ":")
      .replace("M", ":")
      .replace("S", ":");

    const durationParts: string[] = newDuration.split(":");
    //console.log(duration, newDuration, durationParts);

    let actualString = "";
    if (durationParts.length === 3) {
      actualString = `${durationParts[0]}:${
        Number(durationParts[1]) < 9 ? `0${durationParts[1]}` : durationParts[1]
      }:${
        Number(durationParts[2]) < 9 ? `0${durationParts[2]}` : durationParts[2]
      }`;
    }

    if (durationParts.length === 2) {
      actualString = `${durationParts[0]}:${
        Number(durationParts[1]) < 9 ? `0${durationParts[1]}` : durationParts[1]
      }`;
    }

    if (durationParts.length === 1) {
      actualString = `0:${
        Number(durationParts[0]) < 9 ? `0${durationParts[0]}` : durationParts[0]
      }`;
    }

    return actualString;
  } else {
    return "";
  }
};
