
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

/* link_page */
const f_div_generator = (base_div_iterator,color_selector,div_generator_base_id) => {
var background_colors=[
'#0d0422',
'#06406c',
'#3a198b',
'#723eb6',
'#647696',
'#adb7f5',
'#99c4a6',
'#d4aa5c',
'#d36f48'
]
let ddiv = document.createElement("div");
let div_generator_base = document.getElementById(div_generator_base_id);
ddiv.id = "b_"+`${base_div_iterator}`;
ddiv.style.paddingTop = '20px';
ddiv.style.paddingBottom = '20px';
ddiv.style.textAlign = 'center';
ddiv.style.color = 'white';
ddiv.style.backgroundColor = background_colors[color_selector];
ddiv.style.fontSize = '2em';
div_generator_base.appendChild(ddiv);
return ddiv.id;
}
const f_lamda_link = (innerhtml,url,id,base_div_iterator,color_selector,div_generator_base_id) => {
let base_element_basis=f_div_generator(base_div_iterator,color_selector,div_generator_base_id);
let base_element = document.getElementById(base_element_basis);
let ddiv = document.createElement("lamda_link");
ddiv.innerHTML = innerhtml;
ddiv.id = id;
base_element.appendChild(ddiv);
function execute_z(element,url){window.open(url);}
let lamdalink = document.getElementById(id);
lamdalink.addEventListener("click", function(e){let target = e.target || e.srcElement; execute_z(target,url)}, false);
}
const f_generate_link_page = (links,div_generator_base_id) => {
const link_page_copyright=`
Copyright (c) 2019 Michael Neill Hartman. All rights reserved.
mnh_license@proton.me
https://github.com/hartmanm
`
var base_div_iterator=1;
var color_selector=1;
for(let i=0;i<links.length;i++){
let accumulator=[];
let counter=0;
links[i].forEach((inner_value) => {
accumulator[counter]=inner_value.toString();
counter++;
});
f_lamda_link(accumulator[0],accumulator[1],accumulator[2],base_div_iterator,color_selector,div_generator_base_id);
color_selector++;
base_div_iterator++;
if(color_selector==9){color_selector=0;}
};
};
/* link_page */
