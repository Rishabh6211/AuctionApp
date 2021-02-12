export function truncateStr(_str, _idx, isDot = true) {
    if (_str.length > _idx) {
      if (isDot) {
        return _str.substring(0, _idx) + "...";
      } else {
        return _str.substring(0, _idx) + " *** ****";
      }
    } else {
      return _str;
    }
  }