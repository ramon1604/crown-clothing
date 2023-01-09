export const msgConditionReturn = (msg, cond) => {
  if (cond) {
    alert(msg);
    return true;
  } else {
    return false;
  }
};

export const actionReducer = (type, payload) => ({ type, payload });
