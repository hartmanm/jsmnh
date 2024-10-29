
// Copyright (c) 2016-2024 Michael Neill Hartman. All rights reserved.
// mnh_license@proton.me
// https://github.com/hartmanm

const loadAndProcessData = async (url) => {
const theMap = {};
let lineNumber = 1;
try {
const response = await fetch(url);
if (!response.ok) {
throw new Error('response.statusText: ' + response.statusText);
}
const contentType = response.headers.get('Content-Type');
const textData = await response.text();
if (contentType.includes('application/json')) {
const data = JSON.parse(textData);
if (Array.isArray(data)) {
data.forEach(line => processLine(line, theMap, lineNumber++));
}
} else if (contentType.includes('text/csv') || contentType.includes('text/plain')) {
const lines = textData.split('\n');
lines.forEach(line => {
if (line) {
processLine(line, theMap, lineNumber++);
}
});
} else {
throw new Error('content type not implemented: ' + contentType);
}
return theMap;
} catch (error) {
console.error('processing error:', error);
throw error;
}
};

const processLine = (line, theMap, lineNumber, ifs = ',') => {
const tokens = line.split(ifs);
if (!theMap[lineNumber]) {
theMap[lineNumber] = [];
}
tokens.forEach(item => {
item = item.trim();
if (item.endsWith('\n')) {
item = item.slice(0, -1);
}
theMap[lineNumber].push(item);
});
};
