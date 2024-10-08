const stdouts = [];
const maxLength = 200;

export let isModified = false;
export default () => {
  const oldWrite = process.stdout.write.bind(process.stdout);
  const disable = () => {
    process.stdout.write = oldWrite;
    isModified = false;
  };
  process.stdout.write = (chunk, encoding, callback) => {
    stdouts.push(Buffer.from(chunk, encoding));
    oldWrite(chunk, encoding, callback);
    if (stdouts.length > maxLength) {
      stdouts.shift();
    }
  };
  isModified = true;
  return { disable };
};

export const logs = () => {
  return Buffer.concat(stdouts.length > 0 ? stdouts : [Buffer.from('')]);
};
