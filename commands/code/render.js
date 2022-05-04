const { getFirestore } = require('firebase-admin/firestore');
const admin = require("../../database/admin");

const firestore = getFirestore();

module.exports = {
  name: 'render',
  description: 'Ping!',
  myChannelPerms:['VIEW_CHANNEL', 'SEND_MESSAGES'],
  // cooldown: 35,
  args: false,
  async execute(message) {
    // console.log("test");
    // message.channel.send('Rendering...');
    let slug = generateSlug(new Date().getTime());
    const currentTime = new Date().toISOString();
    let content = "";
    const postRef = firestore.collection('users').doc(message.author.id).collection('userPosts').doc(slug);
    let codesObj = codeBlockParser(message.content);
    console.log("codesObj",codesObj);
    // message.channel.send(`\`\`\`json\n${JSON.stringify(codesObj, null, 2)}\n\`\`\``);
    // let htmlCodes = codesObj.filter(e=>e.lang.toLowerCase() == 'html')//.map(e=>e.code);
    // let cssCodes = codesObj.filter(e=>e.lang.toLowerCase() == 'css')//.map(e=>e.code);
    // let jsCodes = codesObj.filter(e=>e.lang.toLowerCase() == 'js' || e.lang.toLowerCase() == 'javascript' )//.map(e=>e.code);
    codesObj.forEach((e,i)=>{
      if(e.lang.toLowerCase() == 'html'){
        content += e.code;
      }else if(e.lang.toLowerCase() == 'css'){
        content += `<style>${e.code}</style>`;
      }else if(e.lang.toLowerCase() == 'js' || e.lang.toLowerCase() == 'javascript'){
        content += `<script>${e.code}</script>`;
      }
    });

    if(!content || content.length < 1) return message.channel.send("No code found!");
    // console.log(content);
    // message.channel.send(`\`\`\`html\n${content}\n\`\`\``);
    // return;
    const post = {
      title: `${message.author.username}'s codin page`,
      content: content.length > 0 ? content : 'No content',
      author: message.author.id,
      createdAt: currentTime,
      lastUpdatedAt: currentTime,
      slug: slug
    }
    try {
      const newPost = await postRef.set(post);
      message.channel.send(`slug: ${slug}\n> page: http://localhost:3000/page/${message.author.id}/${slug}\n> code: http://localhost:3000/code/${message.author.id}/${slug}`);
      console.log(JSON.stringify(newPost, null, 2));
    } catch (error) {
      message.channel.send('Error writing new post to database');
      console.error(error);
    }
    
  },
};

function generateSlug(time) {
  let timeString = time.toString(32);
  let slug = [...timeString].map(c => {
    if(randInt(0,1) == 1){
      return c + randInt(0,20);
    }else{
      return c;
    }
  }).join('')
  return slug;
}

function randInt(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function codeBlockParser (str){
  const reg =  /```(\S*)?(?:\s+)?\n((?:(?!```)[^])+)```/g;
  return [...str.matchAll(reg)]
    .map(e=>({lang:e[1],code:e[2]}));
}