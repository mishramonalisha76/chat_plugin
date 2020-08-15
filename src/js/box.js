import Box from '3box'
const ad1="0xD6aaCEd767524B1CAc368EC732dB37EC9dB268dB"
const ad2="0x75009ce317Ef3e66259fd00D211af73558cFE5d1"


async function initChat(address)
{     console.log(typeof(address));
   // chatFuncations[0].myProfile = await Box.getProfile(address);
    chatFuncations[0].box = await Box.openBox(address.toString(), window.ethereum)
    console.log("hello");

    await chatFuncations[0].box.syncDone

    
    chatFuncations[0].space = await chatFuncations[0].box.openSpace('3chat');
    

    await  chatFuncations[0].space.syncDone
    chatFuncations[0].myDid = chatFuncations[0].space.DID;
    console.log(chatFuncations[0].box);

    
}
const chatFuncations=[
    
{
box:"",
space:"",
myDid:"",
myProfile:"",
thread:"",


// show:async function()
// { 
    
//     console.log(chatFuncations[0].box)
//     console.log(chatFuncations[0].space)
//     console.log(chatFuncations[0].myDid)
//     console.log(await chatFuncations[0].thread.listModerators())
//     console.log(await chatFuncations[0].thread.listMembers())
// },



joinThread:async function(address)
{   
        await  initChat(address.toString())
        chatFuncations[0].thread = await chatFuncations[0].space.joinThread('chain5',{members:true})
         console.log( chatFuncations[0].thread)
},

post:async function(message,address)
{
  
    await chatFuncations[0].joinThread(address.toString())
    await chatFuncations[0].thread.post(message)
    await chatFuncations[0].getPost()
},

getPost: async function(address)
{   
    
    await chatFuncations[0].joinThread(address.toString())
    const posts = await chatFuncations[0].thread.getPosts()
    console.log(posts)
    // console.log(posts.message)
    return posts
},
addMember:async function(address){

    
    await chatFuncations[0].joinThread(address.toString())
    await chatFuncations[0].thread.addMember(address.toString())
    console.log(await chatFuncations[0].thread.listModerators())
    console.log(await chatFuncations[0].thread.listMembers())
  //the address is available in 

},


}

]


export default chatFuncations
