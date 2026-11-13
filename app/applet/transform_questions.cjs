import fs from 'fs';

const filePath = './src/data/differentiatedQuestions.ts';
let content = fs.readFileSync(filePath, 'utf8');

const targetPattern = ['a', 'c', 'b', 'd', 'c']; // Pattern A, C, B, D, C for Q1..Q5

let count = 0;

// Match question blocks
// Example block:
// questionNumber: 1,
// ...
// options: [
//   { id: 'a', text: '...' },
//   { id: 'b', text: '...' },
//   { id: 'c', text: '...' },
//   { id: 'd', text: '...' }
// ],
// correctOptionId: 'a',

const newContent = content.replace(
  /(questionNumber:\s*(\d+)[\s\S]*?options:\s*\[\s*\{\s*id:\s*'a',\s*text:\s*('[^']+'|"[^"]+")\s*\}[\s\S]*?\{\s*id:\s*'b',\s*text:\s*('[^']+'|"[^"]+")\s*\}[\s\S]*?\{\s*id:\s*'c',\s*text:\s*('[^']+'|"[^"]+")\s*\}[\s\S]*?\{\s*id:\s*'d',\s*text:\s*('[^']+'|"[^"]+")\s*\}\s*\][\s\S]*?correctOptionId:\s*')a(')/g,
  (match, p1, qNumStr, textA, textB, textC, textD, pSuffix) => {
    const qNum = parseInt(qNumStr, 10);
    const patternIndex = (qNum - 1) % 5;
    const targetId = targetPattern[patternIndex]; // 'a', 'c', 'b', 'd', 'c'

    count++;

    let newA = textA;
    let newB = textB;
    let newC = textC;
    let newD = textD;

    if (targetId === 'c') {
      newA = textC;
      newC = textA;
    } else if (targetId === 'b') {
      newA = textB;
      newB = textA;
    } else if (targetId === 'd') {
      newA = textD;
      newD = textA;
    }

    // Reconstruct match
    let res = match;
    res = res.replace(`id: 'a', text: ${textA}`, `id: 'a', text: ___NEWA___`);
    res = res.replace(`id: 'b', text: ${textB}`, `id: 'b', text: ___NEWB___`);
    res = res.replace(`id: 'c', text: ${textC}`, `id: 'c', text: ___NEWC___`);
    res = res.replace(`id: 'd', text: ${textD}`, `id: 'd', text: ___NEWD___`);

    res = res.replace(`___NEWA___`, newA);
    res = res.replace(`___NEWB___`, newB);
    res = res.replace(`___NEWC___`, newC);
    res = res.replace(`___NEWD___`, newD);

    res = res.replace(/correctOptionId:\s*'a'/, `correctOptionId: '${targetId}'`);

    return res;
  }
);

console.log('Processed questions count:', count);
fs.writeFileSync(filePath, newContent, 'utf8');
