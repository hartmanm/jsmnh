
// Copyright (c) 2016-2024 Michael Neill Hartman. All rights reserved.
// mnh_license@proton.me
// https://github.com/hartmanm

const f_process_remote_data = async (url) => {
try {
const response = await fetch(url);
if(!response.ok){
throw new Error('response.statusText: ' + response.statusText);
}
const content_type = response.headers.get('Content-Type');
const uint8_data = await response.text();
console.warn('undefined content type:',content_type);
console.log('first 48 received: !',uint8_data.substring(0, 48),'!');
return uint8_data;
} catch(error){
console.error('processing error:', error);
throw error;
}
};

const f_process_line = (line,the_map,line_number,ifs) => {
const tokens = line.split(ifs);
if(!the_map[line_number]){
the_map[line_number] = [];
}
tokens.forEach(item => {
item = item.trim();
if (item.endsWith('\n')) {
item = item.slice(0, -1);
}
the_map[line_number].push(item);
});
};
