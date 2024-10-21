const deleteSlashes = (url: string | undefined, char: string = '/'): string => {
  if (url !== undefined) {
    return url.split(char).filter((symbol) => symbol !== '').join(char);
  } else {
    return '';
  } 
}

export default deleteSlashes;