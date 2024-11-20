export function hexToBigInt(hex: string) {
  return BigInt(`0x${hex}`);
}

export function splitToWords(
  number: bigint,
  wordsize: bigint,
  numberElement: bigint
): bigint[] {
  let t = number;
  const words: bigint[] = [];
  const mask = BigInt(BigInt(1) << wordsize) - 1n;
  for (let i = BigInt(0); i < numberElement; ++i) {
    const word = t & mask;
    words.push(word);
    t >>= wordsize;
  }
  if (!(t == BigInt(0))) {
    throw `Number ${number} does not fit in ${(
      wordsize * numberElement
    ).toString()} bits`;
  }
  return words;
}

export function wordsToBigInt(
  words: bigint[],
  wordsize: bigint,
  numberElement: bigint
): bigint {
  let t = BigInt(0);
  for (let i = 0; i < numberElement; ++i) {
    t <<= wordsize;
    t |= words[Number(numberElement) - i - 1];
  }
  return t;
}

console.log(
  splitToWords(
    // BigInt(
    //   0x11839296a789a3bc0045c8a5fb42c7d1bd998f54449579b446817afbd17273e662c97ee72995ef42640c550b9013fad0761353c7086a272c24088be94769fd16650n
    // ),
    ((1n << (2n * 513n)) /
      BigInt(
        6864797660130609714981900799081393217269435300143305409394463459185543183397656052122559640661454554977296311391480858037121987999716643812574028291115057151n
      )) *
      1n,
    120n,
    5n
  ).map((limb) => limb.toString(16))
);
