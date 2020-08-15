import React from "react"
import CF from "../js/box"
import Web3 from "web3";
import ChatBox from '3box-chatbox-react';
import Box from '3box'

export default class Chat extends React.Component {

    async componentWillMount() {
        await this.loadWeb3()

        // const post = await CF[0].getPost("0xD6aaCEd767524B1CAc368EC732dB37EC9dB268dB")
        // console.log("Yippe2")
        // this.setState({

        //     posts: post,
        // })
        // console.log(this.state.posts)
        // console.log(this.state.account)

        // await CF[0].joinThread(this.state.account);

        // await this.loadMessages()
        const profile = await Box.getProfile("0xD6aaCEd767524B1CAc368EC732dB37EC9dB268dB")
        this.setState({profile:profile})

    }
    async  loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
            window.ethereum.autoRefreshOnNetworkChange = false;
            const account = await window.web3.eth.getAccounts()
            this.setState({ account: account });
        }
        else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
            window.ethereum.autoRefreshOnNetworkChange = false;
        }
        else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            account: "",
            posts: "",
            messages: [],
            profile:null
        }
    }

    // async loadMessages() {
    //     let info = []
    //     this.state.posts.forEach((res) => {
    //         info.push({
    //             author: res.author,
    //             message: res.message
    //         })
    //     })
    //     console.log(info)
    //     this.setState({ messages: info })
    // }




    render() {
        console.log(this.state.posts);
        return (
            // <>

            //     { this.state.messages.map((message)=>
            //         <div>
            //         <p>{message.author} sent {message.message}</p>
            //         <br></br>
            //         </div>
            //     )}

            // </>
            <ChatBox
                // required
                spaceName="3chat"
                threadName="chain5"


                // Required props for context A) & B)
                box={ Box.openBox("0xD6aaCEd767524B1CAc368EC732dB37EC9dB268dB", window.ethereum)}
                currentUserAddr={"0xD6aaCEd767524B1CAc368EC732dB37EC9dB268dB".toString()}

                // Required prop for context B)
                // loginFunction={handleLogin}

                // // Required prop for context C)
                // ethereum={ethereum}

                // optional
                // mute={false}
                // popupChat
                // showEmoji
                // colorTheme="#181F21"
               // posts={this.state.posts}
                 currentUser3BoxProfile={this.state.profile}
               //  userProfileURL={address => `https://3box.io/0x71919b05c0a36af7c46ce2b4a597879efe3326c3`}
                // spaceOpts={}
                // threadOpts={}
                // agentProfile={
                //     chatName: "3Box",
                //         imageUrl: "https://imgur.com/RXJO8FD"
    //}
      />
        )
    }
}