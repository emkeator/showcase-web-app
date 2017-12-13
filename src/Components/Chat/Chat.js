import React, {Component} from 'react'

export default class Home extends Component{
    constructor() {
        super()
        this.state = {
            message: '',
            messages: [],
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        }
    }

    componentWillMount(){
        //join the socket room!
        let stamp = new Date()
        let minutes = stamp.getMinutes()
        minutes = minutes < 10 ? `0${minutes}` : `${minutes}`
        console.log(minutes)
        let messages = [{
            from: 'admin',
            timeStamp: `${this.state.months[stamp.getMonth()]} ${stamp.getDate()} - ${stamp.getHours() - 12}:${minutes}`,
            content: 'Hi! How can I help you? :)'
        }]
        this.setState({
            messages
        }, () => console.log(this.state))
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

    sendMessage(){
        //send to database!
        let x = this.state.messages.slice()
        let stamp = new Date()   
        let minutes = stamp.getMinutes()
        minutes = minutes < 10 ? `0${minutes}` : `${minutes}`     
        let newMessage = {
            content: this.state.message,
            from: 'user',
            timeStamp: `${this.state.months[stamp.getMonth()]} ${stamp.getDate()} - ${stamp.getHours() - 12}:${minutes}`,
        }
        x.push(newMessage)
        this.setState({
            messages: x,
            message: '',
            
        })
        //actually send image!!!
    }
    
    uploadImage(){
        console.log('S3 Incoming')
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
                                <p>{e.content}</p>
                            </div>
                        })}
                    </div>
                    <div className="inputBar">
                        {/* <button onClick={() => this.uploadImage()}>&#128247;</button> */}
                        <button onClick={() => this.uploadImage()}>+</button>
                        <textarea onChange={(e) => this.handle('message', e.target.value)} value={this.state.message} placeholder="Chat with an agent!"/>
                        <button onClick={() => this.sendMessage()}>Send</button>
                    </div>
                </section>
                
            </div>
        )
    }
}