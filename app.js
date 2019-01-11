const Peer = require('peerjs');
const uid = require('uid');
const $ =require('jquery');
const openStream = require('../openStream');
const playVideo = require('../playVideo');
const config ={key:'peerjs'};
function getPeer(){
    id = Math.random();
    $('#myPeer').html('ID : '+id);
    return id;
}
console.log(Math.random());
const peer = new Peer(getPeer(),config);
console.log(peer);
$('#btnConnect').click(()=>{
    const friendID = $('#txtfriendID').val();
    console.log('dang call');
    openStream(stream=>{
        playVideo(stream,'localStream');
        const call = peer.call(friendID,stream);
        call.on('stream',remoteStream => playVideo(remoteStream,'yourFriendStream'));
    })
});
peer.on('call',(call)=>{
    console.log('Co nguoi goi');
    openStream(stream=>{
        playVideo(stream,'localStream');
        call.answer(stream); // Answer the call with an A/V stream.
        call.on('stream',remoteStream => playVideo(remoteStream,'yourFriendStream'));
    })
})