import React, {Component} from 'react'
import io from 'socket.io-client'
import axios from 'axios'

const socket = io()

export default class Home extends Component{
    constructor() {
        super()
        this.state = {
            message: '',
            photo: null,
            messages: [],
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            available: false
        }

        socket.on('message dispatched', data => {
            // console.log('Sent');

            let {messages} = this.state
            if(data.from === 'admin'){
                //Following Code Block is for Sample Functionality
                let len = messages.filter((e) => e.from === 'admin').length
                if( len === 2){
                    data.content = "This is a sample app, and sample admin response."
                } else if (len > 2){
                    data.content = <div>
                                        <p>I'm all out of info for you...</p>
                                        <img src={'https://metrouk2.files.wordpress.com/2017/10/giphy-141.gif'} alt="porg gif"/>
                                   </div>
                }
                

                messages.push(data)
                this.setState({
                    messages
                })
            }
            // console.log(messages)
        })

    }

    componentWillMount(){
        //join the socket room!
        let stamp = new Date()
        let minutes = stamp.getMinutes()
        minutes = minutes < 10 ? `0${minutes}` : `${minutes}`
        let messages = [{
            from: 'admin',
            timeStamp: `${this.state.months[stamp.getMonth()]} ${stamp.getDate()} - ${stamp.getHours() - 12}:${minutes}`,
            content: 'Hi! How can I help you? :)'
        }]
        this.setState({
            messages
        })
        
        axios.get('/auth/me').then(res => {
            if(res.data === 'User not found'){
                alert('Chat function currently unavailable.')
            } else {
                this.setState({
                    user: res.data,
                    available: true
                })
                this.joinRoom(res.data.id)
            }
        })
        
    }


    componentDidUpdate(oldProps, oldState){
        // console.log(oldProps, oldState)
        if(this.state.messages.length > oldState.messages.length){
            this.refs.messageWrapper.scrollTop = this.refs.messageWrapper.scrollHeight
        }

    }

    handle(tracker, value){
        switch (tracker) {
            case 'message':
                this.setState({
                    message: value
                })
                break;
        
            default:
                break;
        }
    }

    sendMessage(event){
        //send to database!
        event.preventDefault()
        
        let x = this.state.messages.slice()
        let stamp = new Date()   
        let minutes = stamp.getMinutes()
        minutes = minutes < 10 ? `0${minutes}` : `${minutes}`     
        let newMessage = {
            content: this.state.message,
            from: 'user',
            timeStamp: `${this.state.months[stamp.getMonth()]} ${stamp.getDate()} - ${stamp.getHours() - 12}:${minutes}`,
        }

        if(this.state.photo) {
            axios.post('/api/photoUpload', this.state.photo).then(res => {
                // console.log(res.data)

                newMessage.content = newMessage.content.replace(/(?:\(image\ uploaded\!\))/, "")

                newMessage.content = <div>
                                        <p>{newMessage.content}</p>
                                        <img src={res.data.Location} alt="upload pic"/>
                                     </div>
                // let message2 = Object.assign({}, newMessage)
                // message2.content = <img src={res.Location}/>
                x.push(newMessage)
                // x.push(message2)
                this.setState({
                    messages: x,
                    message: '',
                    photo: null
                })

                socket.emit('message sent', {
                    message: newMessage,
                    room: this.state.user.id
                })
                // socket.emit('message sent', {
                //     message: message2,
                //     room: this.state.user.id
                // })
            })
            
        } else {
            x.push(newMessage)
            this.setState({
                messages: x,
                message: '',
            })

            socket.emit('message sent', {
                message: newMessage,
                room: this.state.user.id
            })

        }
        
    }
    
    uploadImage(event){
        // console.log('S3 Incoming')
        const reader = new FileReader(),
              file = event.target.files[0]
        
        reader.onload = photo => {
            this.setState({
                photo: {
                    file: photo.target.result,
                    filename: file.name,
                    filetype: file.type
                },
                message: this.state.message + ` (image uploaded!)`
            })
        }
        reader.readAsDataURL(file)

        
    }

    joinRoom(room) {
        socket.emit('join room', {
            room: room
        })
    }

    render(){
        return(
            <div id="Chat">
                <span onClick={() => this.props.changeView('chat')}>Chat</span>
                <section className="chatContainer" >
                    <div className="messageWrapper" ref="messageWrapper">
                        {this.state.messages.map((e, i) => {
                            return <div key={i} className={`message ${e.from}`}>
                                <em>{e.timeStamp}</em>
                                <div className="content">{e.content}</div>
                            </div>
                        })}
                    </div>
                    <div className="inputBar">
                        {/* <button onClick={() => this.uploadImage()}>&#128247;</button> */}
                        <div className="fileUploadWrapper">
                            <span className="fakeButton">+</span>
                            <input onChange={(e) => this.uploadImage(e)} disabled={!this.state.available} type="file"/>
                        </div>
                        <textarea onChange={(e) => this.handle('message', e.target.value)} 
                                  value={this.state.message} placeholder="Chat with an agent!" 
                                  disabled={!this.state.available} 
                                  onKeyPress={e => {
                                      if(e.which === 13) this.sendMessage(e)
                                  }}/>
                        <button onClick={(e) => this.sendMessage(e)} disabled={!this.state.available}>Send</button>
                    </div>
                </section>
                
            </div>
        )
    }
}