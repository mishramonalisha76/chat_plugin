//import EditProfile from '3box-profile-edit-react';
import Web3 from "web3";
import React from "react";
const Box = require('3box')
export default class Profile extends React.Component {

    async componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockchainData()

    }

    async loadWeb3() {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        }
        else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
    }

    async loadBlockchainData() {

        const web3 = window.web3
        this.setState({web3:web3})
        const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0] })
        console.log(this.state.account)
        // const smartContract = new web3.eth.Contract(contractABI, "0xfa85e3187a9642619c810fa2059e045271423c9a")
        // this.setState({ smartContract: smartContract })



        const box = await Box.openBox(this.state.account, window.ethereum,{})
        this.setState({ box: box })
        await new Promise((resolve, reject) => box.onSyncDone(resolve))
        const space = await box.openSpace("profile")
        this.setState({ space: space })
        console.log(space.DID)
       
        // const fields = ['name', 'website', 'employer']
        // const values = ['Jon Schwartz', 'openworklabs.com', 'Open Work Labs']

        // await box.public.setMultiple(fields, values)
        // const profile = await Box.getProfile(this.state.account)
        // console.log(profile)
        const boxProfile = await Box.getSpace(this.state.account, 'profile')
        console.log(boxProfile.defaultProfile)
        if (boxProfile.defaultProfile === undefined) {
        //    console.log(this.state.web3)
            const box = await Box.openBox(this.state.account,window.ethereum)
            const boxSyncPromise = new Promise((resolve, reject) => box.onSyncDone(resolve))
            let boxSpace
            const spaceSyncPromise = new Promise(async (resolve, reject) => {
                boxSpace = await box.openSpace('3box', { onSyncDone: resolve })
            })
            console.log(boxSpace)
            await boxSyncPromise
            await spaceSyncPromise
        }

    }

    constructor(props) {
        super(props);
        this.state = {
            // smartContract: null,
            web3: null,
            account: null,
            box: "",
            space: ""


        }
    }

    render() {
        return (
            // <EditProfile
            //     // required
            //     box={this.state.box}
            //     space={this.state.space}
            //     currentUserAddr={this.state.account}

            //     // optional
            //     // customFields={customFields}
            //     // currentUser3BoxProfile={myProfile}
            //     // redirectFn={redirectFn}
            // />
            <h1>"HI"</h1>

        )
    }

}
