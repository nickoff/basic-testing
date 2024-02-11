import path from 'node:path';
import fs from 'node:fs';
import fsPromises from 'node:fs/promises';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();

    doStuffByTimeout(callback, 100);

    expect(setTimeout).toHaveBeenCalledWith(callback, 100);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();

    doStuffByTimeout(callback, 100);

    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(100);

    expect(callback).toHaveBeenCalledTimes(1);

    expect(callback).toBeCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    const callback = jest.fn();

    doStuffByInterval(callback, 100);

    expect(setInterval).toHaveBeenCalledWith(callback, 100);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();

    doStuffByInterval(callback, 100);

    jest.advanceTimersByTime(300);

    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    jest.spyOn(path, 'join');

    const fileName = 'file.txt';

    await readFileAsynchronously(fileName);

    expect(path.join).toHaveBeenCalledWith(__dirname, fileName);
  });

  test('should return null if file does not exist', async () => {
    const fileName = 'file.txt';

    const result = await readFileAsynchronously(fileName);

    expect(result).toEqual(null);
  });

  test('should return file content if file exists', async () => {
    const content = 'file content';
    const fileName = 'file.txt';

    jest.spyOn(fs, 'existsSync').mockReturnValue(true);

    jest.spyOn(fsPromises, 'readFile').mockResolvedValue(Buffer.from(content));

    const result = await readFileAsynchronously(fileName);

    expect(result).toEqual(content);
  });
});
