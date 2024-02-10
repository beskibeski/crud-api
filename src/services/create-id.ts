import crypto from 'crypto';

const createUniqID = (): string => {
  return crypto.randomUUID();  
}

export default createUniqID;