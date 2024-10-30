
// Copyright (c) 2016-2024 Michael Neill Hartman. All rights reserved.
// mnh_license@proton.me
// https://github.com/hartmanm

const jsmnh_copyright=`
Copyright (c) 2016-2024 Michael Neill Hartman. All rights reserved.
mnh_license@proton.me
https://github.com/hartmanm
`;

const f_process_remote_data = async (url) => {
try {
const response = await fetch(url);
if(!response.ok){
throw new Error('response.statusText: ' + response.statusText);
}
const content_type = response.headers.get('Content-Type');
const uint8_data = await response.text();
console.log('undefined content type:',content_type);
console.log('first 48 received: !',uint8_data.substring(0, 48),'!');
return uint8_data;
} catch(error){
console.error('processing error:', error);
throw error;
}
};

const f_split_with_ifs = (input_segment,result_map,segment_number,ifs) => {
const tokens = input_segment.split(ifs);
if(!result_map[segment_number]){
result_map[segment_number]=[];
}
tokens.forEach(item => {
result_map[segment_number].push(item);
});
};

const f_process_kv = (input_segment,kv_map) => {
let keys=[];
let values=[];
f_split_segment(keys,values,input_segment,':');
let segment_number=0;
keys.forEach(item => {
if(!values[segment_number]){
values[segment_number]=[];
console.log("!values[segment_number]",segment_number);
}
kv_map[keys[segment_number]].push(values[segment_number]);
segment_number++;
});
};

const f_split_segment = (lefths,righths,input_segment,split_on_char) => {
let parts =[]
if(typeof input_segment === 'string'){
parts = input_segment.split(split_on_char);
} else {
console.log("if(typeof input_segment !== 'string'){");
}
if(parts.length<2){
lefths  =[];
righths =[];
}
lefths = parts.slice(0,-1);
righths = parts.slice(-1);
}

/*
const dep_f_process_line = (line,the_map,line_number,ifs) => {
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
*/

